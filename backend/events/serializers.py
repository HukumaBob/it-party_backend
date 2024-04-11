from rest_framework import serializers

from .models import Event, Speaker


class SpeakerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Speaker
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    """Главная страница списка эвентов."""
    description = serializers.CharField(max_length=100)

    class Meta:
        model = Event
        fields = ('logo', 'name', 'description', 'data', 'time',)


class EventDetailSerializer(serializers.ModelSerializer):
    """Сериализатор для подробной информации от эвенте."""
    speakers = SpeakerSerializer(read_only=True, many=True)
    
    class Meta:
        model = Event
        fields = '__all__'
