from rest_framework import viewsets
from rest_framework.response import Response
from userevents.models import UserEvent
from .models import Organizator
from .permissions import IsStaff
from .serializers import (
    OrganizatorSerializer,
    UserEventApplicationStatusSerializer
    )


class UserEventApplicationStatusViewSet(viewsets.GenericViewSet):
    """Представление для работы организатора с заявками пользователей"""
    queryset = UserEvent.objects.all()
    serializer_class = UserEventApplicationStatusSerializer
    permission_classes = [IsStaff]

    def partial_update(self, request, *args, **kwargs):
        """Обновление статуса заявки"""
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True
            )
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # Если 'prefetch_related' был применен,
            # то нужно обновить кэш prefetch.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        """Сохранение обновленного статуса заявки"""
        serializer.save()


class OrganizatorViewSet(viewsets.ModelViewSet):
    """Представление для работы организатора"""
    queryset = Organizator.objects.all()
    serializer_class = OrganizatorSerializer
    permission_classes = [IsStaff]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
