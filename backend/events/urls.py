from django.urls import include, path
from rest_framework import routers
from .views import (
    EventViewSet,
    )


app_name = 'events'

router_v1 = routers.DefaultRouter()

router_v1.register(
    r'events',
    EventViewSet,
    basename='events'
)

urlpatterns = [
    path('', include(router_v1.urls)),
]
