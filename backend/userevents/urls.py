from django.urls import path
from .views import (
    ApplyForEventView,
    SubmitApplicationView,
    UnfavoriteEventView
    )

app_name = 'userevents'

urlpatterns = [
    path(
        'register_and_apply/<int:event_id>/',
        ApplyForEventView.as_view(),
        name='register_and_apply'
        ),
    path(
        'submit_application/<int:user_event_id>/',
        SubmitApplicationView.as_view(),
        name='submit_application'
        ),
    path(
        'remove_event_from_favorite/<int:event_id>/',
        UnfavoriteEventView.as_view(),
        name='remove_event_from_favorite'
        ),
]
