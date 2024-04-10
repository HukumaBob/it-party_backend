from rest_framework import serializers
from .models import Organizator
from events.models import Event, Speaker
from events.serializers import EventSerializer, SpeakerSerializer


class OrganizatorSerializer(serializers.ModelSerializer):
    event = EventSerializer()
    speaker = SpeakerSerializer(many=True)

    class Meta:
        model = Organizator
        fields = ['user', 'event', 'speaker']

    def create(self, validated_data):
        event_data = validated_data.pop('event')
        speaker_data = validated_data.pop('speaker')
        event = Event.objects.create(**event_data)
        organizator = Organizator.objects.create(event=event, **validated_data)
        for speaker in speaker_data:
            Speaker.objects.create(organizator=organizator, **speaker)
        return organizator
