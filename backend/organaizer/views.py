from rest_framework import viewsets
from .models import Organizator
from .serializers import OrganizatorSerializer
from .permissions import IsOrganizator


class OrganizatorViewSet(viewsets.ModelViewSet):
    """Представление для работы организатора"""
    queryset = Organizator.objects.all()
    serializer_class = OrganizatorSerializer
    permission_classes = [IsOrganizator]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
