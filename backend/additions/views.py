from rest_framework import mixins, viewsets, permissions
from .models import (
    Country, City, FamilyStatus,
    Income, Education, Notification
    )
from .serializers import (
    CountrySerializer,
    CitySerializer,
    FamilyStatusSerializer,
    IncomeSerializer,
    EducationSerializer,
    NotificationSerializer,
)


class CountryViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    permission_classes = [permissions.AllowAny]
    # pagination_class = None


class CityViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [permissions.AllowAny]
    # pagination_class = None


class FamilyStatusViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = FamilyStatus.objects.all()
    serializer_class = FamilyStatusSerializer
    permission_classes = [permissions.AllowAny]
    # pagination_class = None


class IncomeViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer
    permission_classes = [permissions.AllowAny]
    # pagination_class = None


class EducationViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [permissions.AllowAny]
    # pagination_class = None


class NotificationViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [permissions.AllowAny]
    # pagination_class = None
