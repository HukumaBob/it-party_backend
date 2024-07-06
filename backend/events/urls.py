from django.urls import include, path
from rest_framework import routers
from .views import (
    AdminEventListView,
    AdminUserEventView,
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
    path('admin_events', AdminEventListView.as_view(), name='admin_events-list'), 
    path('admin_events/<int:event_id>/user_events/', AdminUserEventView.as_view(), name='admin-user-event'),
]
