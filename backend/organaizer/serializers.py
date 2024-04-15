from rest_framework import serializers
from .models import Organizator
from events.models import Event, Speaker
from events.serializers import EventSerializer, SpeakerSerializer
from userevents.models import UserEvent


class UserEventApplicationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEvent
        fields = ['application_status']


class OrganizatorSerializer(serializers.ModelSerializer):
    event = EventSerializer()
    speaker = SpeakerSerializer(many=True)

    class Meta:
        model = Organizator
        fields = ['id', 'event', 'speaker']  # Удалено поле 'user'

    def create(self, validated_data):
        event_data = validated_data.pop('event')
        speaker_data = validated_data.pop('speaker')
        event = Event.objects.create(**event_data)
        # Получаем пользователя из контекста запроса
        user = self.context['request'].user
        organizator = Organizator.objects.create(event=event, user=user)
        for speaker_data in speaker_data:
            speaker = Speaker.objects.create(**speaker_data)
            organizator.speaker.add(speaker)
        return organizator
