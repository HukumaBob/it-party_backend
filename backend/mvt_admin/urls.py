from django.urls import path
from .views import (
    event_create,
    event_detail,
    event_list
    )

app_name = 'mvt_admin'

urlpatterns = [
    path('mvt_admin/', event_list, name='event_list'),
    path('mvt_admin/<int:event_id>/', event_detail, name='event_detail'),
    path('mvt_admin/create/', event_create, name='event_create'),
]
