from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserEvent, UserProfileSnapshot
from .serializers import UserEventSerializer
from events.models import (
    Event,
    get_default_fields,
    )
from users.models import UserProfile
from users.serializers import UserProfileSerializer


class UserEventViewSet(viewsets.ModelViewSet):
    queryset = UserEvent.objects.all()
    serializer_class = UserEventSerializer


class SubmitApplicationView(APIView):
    """
    Пользователь заполнил или изменил поля анкеты
    присланной ему для регистрации на ивент и
    отправил на фронт
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, user_event_id, format=None):
        user_event = UserEvent.objects.get(id=user_event_id)
        event = user_event.event
        user_profile = user_event.user_profile
        form_template = user_event.event.form_template
        if form_template is None:
            fields = get_default_fields()
        else:
            fields = form_template.fields
        # Получаем обновленные данные анкеты из запроса
        form_data = request.data
        # Проверяем, что все необходимые поля заполнены
        for field in fields:
            if field not in form_data:
                return Response(
                    {
                        "message": f"Поле {field} обязательно для заполнения"
                        }, status=status.HTTP_400_BAD_REQUEST
                    )
        # Обновляем профиль пользователя
        for field, value in form_data.items():
            if hasattr(user_profile, field):
                field_instance = getattr(user_profile, field)
                if field_instance.__class__.__name__ == 'ForeignKey':
                    model = field_instance.field.related_model
                    related_instance = get_object_or_404(model, id=value)
                    getattr(user_profile, field).set(related_instance)
        user_profile.save()
        # Получаем данные уведомления из профиля пользователя
        notification = user_profile.notification
        if notification:
            # Вычисляем дату и время уведомления
            event_datetime = datetime.combine(event.date, event.time)
            notification_time = event_datetime - timedelta(
                minutes=notification.minutes_before_notification
                )
            user_event.data_of_notification = notification_time
            user_event.save()
        # Создаем "снимок" обновленной анкеты пользователя
        UserProfileSnapshot.objects.create(
            user_event=user_event, snapshot_data=form_data
            )
        return Response(
            {
                "message": "Анкета успешно отправлена"
                }, status=status.HTTP_200_OK
            )


class ApplyForEventView(APIView):
    """
    Подача заявки пользователем на ивент - 
    пользователь кликнул на кнопку "зарегистрироваться"
    На фронт пришли необходимые поля анкеты, частично
    или полностью заполненные данными юзера из профиля
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id, format=None):
        user = request.user
        event = Event.objects.get(id=event_id)
        user_profile, created = UserProfile.objects.get_or_create(user=user)
        form_template = event.form_template
        if form_template is None:
            fields = get_default_fields()
        else:
            fields = form_template.fields
        # Получаем параметр запроса
        apply = request.data.get('apply', False)
        # Устанавливаем статус заявки в зависимости от параметра запроса
        application_status = 'pending' if apply else 'none'
        # Проверяем, существует ли уже
        # UserEvent для этого пользователя и ивента
        user_event, created = UserEvent.objects.get_or_create(
            user_profile=user_profile, event=event, defaults={
                'application_status': application_status
                }
                )
        if not created and apply:
            user_event.application_status = 'pending'
            user_event.save()
        # Используем сериализатор для извлечения данных из профиля пользователя
        serializer = UserProfileSerializer(user_profile)
        form_data = {
            field: serializer.data.get(field, '') for field in fields
            }
        # Добавляем id user_event в данные формы
        form_data['user_event_id'] = user_event.id        
        # Отправляем данные на фронт
        return Response(form_data)


class UnfavoriteEventView(APIView):
    """
    Удаление события из списка "Избранное" пользователя
    """
    permission_classes = [IsAuthenticated]

    def delete(self, request, event_id, format=None):
        user = request.user
        event = Event.objects.get(id=event_id)
        user_profile = UserProfile.objects.get(user=user)
        # Находим UserEvent для данного пользователя и события
        user_event = UserEvent.objects.filter(
            user_profile=user_profile, event=event
            )
        if user_event.exists():
            user_event.delete()
            return Response(
                {
                    "message": "Событие успешно удалено из списка 'Избранное'"
                }, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {
                    "message": "Событие не найдено в списке 'Избранное'"
                }, status=status.HTTP_400_BAD_REQUEST
            )


class StaffUserEventView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, format=None):
        user_events = UserEvent.objects.filter(
            application_status__in=['pending', 'approved', 'rejected']
            )
        serializer = UserEventSerializer(user_events, many=True)
        return Response(serializer.data)

