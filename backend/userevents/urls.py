from django.urls import path
from .views import ApplyForEventView, SubmitApplicationView

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
]
