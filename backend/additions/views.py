from rest_framework import mixins, viewsets

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


class CityViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class FamilyStatusViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = FamilyStatus.objects.all()
    serializer_class = FamilyStatusSerializer


class IncomeViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer


class EducationViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class NotificationViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
