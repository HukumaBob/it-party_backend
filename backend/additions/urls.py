from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CountryViewSet, CityViewSet,
    FamilyStatusViewSet, IncomeViewSet,
    EducationViewSet, NotificationViewSet
    )

app_name = 'additions'

router_v1 = DefaultRouter()
router_v1.register(
    r'countries', CountryViewSet, basename='countries'
    )
router_v1.register(
    r'cities', CityViewSet, basename='cities'
    )
router_v1.register(
    r'family-statuses', FamilyStatusViewSet, basename='family-statuses'
    )
router_v1.register(
    r'incomes', IncomeViewSet, basename='incomes'
    )
router_v1.register(
    r'educations', EducationViewSet, basename='educations'
    )
router_v1.register(
    r'notifications', NotificationViewSet, basename='notifications'
    )

urlpatterns = [
    path('', include(router_v1.urls)),
]