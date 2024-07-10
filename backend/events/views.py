from rest_framework import viewsets, status, generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from userevents.serializers import UserEventSerializer
from userevents.models import UserEvent
from .models import Event, Speaker, FormTemplate
from additions.models import City
from .filters import EventFilter
from .permissions import IsStaffOrReadOnly
from .serializers import AdminEventSerializer, AdminUserEventSerializer, EventSerializer, EventDetailSerializer
from users.models import Specialization


class EventViewSet(viewsets.ModelViewSet):
    """
    Главная страница эвентов, с возможностью просмотреть подробную информацию.
    """
    queryset = Event.objects.all().order_by('date') 
    filterset_class = EventFilter
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
        data = request.data.copy()

        # Создаем список спикеров и ивентов
        speakers_data = data.pop('speakers')
        speakers = [
            Speaker.objects.create(**speaker_data)
            for speaker_data in speakers_data
            ]
        
        specializations_data = data.pop('specializations')
        specializations = [
            Specialization.objects.create(**specialization_data)
            for specialization_data in specializations_data
        ]        
        # Создаем form_template
        form_template_data = data.pop('form_template')
        form_template = FormTemplate.objects.create(**form_template_data)
 


class AdminEventListView(generics.ListAPIView):
    queryset = Event.objects.all().order_by('date') 
    serializer_class = AdminEventSerializer
    pagination_class = None

    def get_queryset(self):
        # Фильтрация по администратору
        user = self.request.user
        events = Event.objects.filter(event_admin=user)
        return events
    
class AdminUserEventView(generics.ListAPIView):
    serializer_class = AdminUserEventSerializer
    pagination_class = None

    def get_queryset(self):
        event_id = self.kwargs.get('event_id')  # Получаем ID ивента из URL
        user_events = UserEvent.objects.filter(event_id=event_id)
        return user_events