from rest_framework import serializers
# from .models import Organizator
# from events.models import Event, Speaker
# from events.serializers import EventSerializer, SpeakerSerializer
from userevents.models import UserEvent


class UserEventApplicationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEvent
        fields = ['application_status']
