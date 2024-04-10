from rest_framework import viewsets

from .models import Event
from .serializers import EventSerializer, EventDetailSerializer


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Главная страница эвентов, с возможностью просмотреть подробную информацию.
    """
    queryset = Event.objects.all()
    filterset_fields = ('position',)
    search_fields = ('name',)
    ordering_fields = ('data',)

    def get_serializer_class(self):
        if self.action == 'list':
            return EventSerializer
        EventDetailSerializer
