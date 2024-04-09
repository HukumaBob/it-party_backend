from django import forms

from events.models import Event
from userevents.models import UserEvent


class EventForm(forms.ModelForm):

    class Meta:
        model = Event
        fields = ('name', 'data', 'description')


class CommentForm(forms.ModelForm):

    class Meta:
        model = UserEvent
        fields = ('application_status',)
