from rest_framework import viewsets, views
from rest_framework.response import Response

from .models import Event
from .serializers import EventSerializer, EventDetailSerializer


class EventViewSet(viewsets.ModelViewSet):
    """
    Главная страница эвентов, с возможностью просмотреть подробную информацию.
    """
    queryset = Event.objects.all()
    filterset_fields = ('city',)
    search_fields = ('name',)
    ordering_fields = ('data',)

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


class EventDetailView(views.APIView):
    """
    Подробная информация об ивенте.
    """
    def get(self, request, event_id, format=None):
        event = Event.objects.get(id=event_id)
        serializer = EventDetailSerializer(event, context={'request': request})
        return Response(serializer.data)
