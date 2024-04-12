from rest_framework import serializers

from .models import (
    Event,
    Speaker,
    FormTemplate,
    EventFormTemplate
    )


class FormTemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = FormTemplate
        fields = '__all__'


class EventFormTemplateSerializer(serializers.ModelSerializer):
    form_template = FormTemplateSerializer(read_only=True)

    class Meta:
        model = EventFormTemplate
        fields = '__all__'


class SpeakerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Speaker
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    """Главная страница списка эвентов."""
    description = serializers.CharField(max_length=100)

    class Meta:
        model = Event
        fields = ('id', 'logo', 'name', 'description', 'data', 'time',)


class EventDetailSerializer(serializers.ModelSerializer):
    """Сериализатор для подробной информации от эвенте."""
    speakers = SpeakerSerializer(read_only=True, many=True)
    event_form_template = EventFormTemplateSerializer(read_only=True)
    
    class Meta:
        model = Event
        fields = '__all__'

