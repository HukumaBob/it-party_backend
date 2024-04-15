from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Event, Speaker, FormTemplate
from additions.models import City
from .permissions import IsStaffOrReadOnly
from .serializers import EventSerializer, EventDetailSerializer


class EventViewSet(viewsets.ModelViewSet):
    """
    Главная страница эвентов, с возможностью просмотреть подробную информацию.
    """
    queryset = Event.objects.all()
    filterset_fields = ('city',)
    search_fields = ('name',)
    ordering_fields = ('data',)
    permission_classes_by_action = {
        'create': [IsStaffOrReadOnly],
        'update': [IsStaffOrReadOnly],
        'partial_update': [IsStaffOrReadOnly],
        'destroy': [IsStaffOrReadOnly],
        'default': [AllowAny],
    }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [
                permission()
                for permission in self.permission_classes_by_action[
                    self.action
                    ]
                ]
        except KeyError:
            # action is not set return default permission_classes
            return [
                permission()
                for permission in self.permission_classes_by_action['default']
                ]

    def get_serializer_class(self):
        if self.action == 'list':
            return EventSerializer
        return EventDetailSerializer

    #  Это позволяет нам получить текущего пользователя
    # в методе get_user_application_status нашего
    # сериализатора EventSerializer
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
    
    def create(self, request, *args, **kwargs):
        data = request.data

        # Создаем список спикеров
        speakers_data = data.pop('speakers')
        speakers = [
            Speaker.objects.create(**speaker_data)
            for speaker_data in speakers_data
            ]

        # Создаем form_template
        form_template_data = data.pop('form_template')
        form_template = FormTemplate.objects.create(**form_template_data)

        # Получаем город по идентификатору
        city_id = data.pop('city')
        city = City.objects.get(id=city_id)

        # Получаем пользователя, сделавшего запрос
        user = request.user

        # Создаем ивент
        event = Event.objects.create(
            created_by=user, form_template=form_template, city=city, **data
            )

        # Добавляем спикеров к ивенту
        event.speakers.set(speakers)

        serializer = self.get_serializer(event)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

