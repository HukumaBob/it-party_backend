from rest_framework import serializers
from .models import UserEvent


class UserEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEvent
        fields = ['id', 'user_profile', 'event', 'application_status']
