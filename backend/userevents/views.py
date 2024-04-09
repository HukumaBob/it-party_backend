from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserEvent, UserProfileSnapshot
from .serializers import UserEventSerializer
from events.models import Event, EventFormTemplate
from users.models import UserProfile


class UserEventViewSet(viewsets.ModelViewSet):
    queryset = UserEvent.objects.all()
    serializer_class = UserEventSerializer


class SubmitApplicationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_event_id, format=None):
        user_event = UserEvent.objects.get(id=user_event_id)
        user_profile = user_event.user_profile
        form_template = EventFormTemplate.objects.get(event=user_event.event)
        required_fields = form_template.fields
        # Получаем обновленные данные анкеты из запроса
        form_data = request.data
        # Проверяем, что все необходимые поля заполнены
        for field in required_fields:
            if field not in form_data:
                return Response(
                    {
                        "message": f"Поле {field} обязательно для заполнения"
                        }, status=status.HTTP_400_BAD_REQUEST
                    )
        # Обновляем профиль пользователя
        for field, value in form_data.items():
            if hasattr(user_profile, field):
                setattr(user_profile, field, value)
        user_profile.save()
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
    permission_classes = [IsAuthenticated]

    def post(self, request, event_id, format=None):
        user = request.user
        event = Event.objects.get(id=event_id)
        user_profile = UserProfile.objects.get(user=user)
        form_template = EventFormTemplate.objects.get(event=event)
        # Проверяем, существует ли уже UserEvent
        # для этого пользователя и ивента
        user_event, created = UserEvent.objects.get_or_create(
            user_profile=user_profile, event=event
            )
        # Извлекаем данные из профиля пользователя
        form_data = {
            field: getattr(
                user_profile, field
                ) if hasattr(
                    user_profile, field
                    ) else getattr(
                        user_profile.user, field
                        )
            for field in form_template.fields
        }
        # Отправляем данные на фронт
        return Response(form_data)

