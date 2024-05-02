from rest_framework import serializers

from .models import (
    Event,
    Speaker,
    FormTemplate,
    )
from userevents.models import UserEvent
from users.models import UserProfile


class FormTemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = FormTemplate
        fields = '__all__'


class SpeakerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Speaker
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    """Главная страница списка эвентов."""
    description = serializers.CharField(max_length=100)
    user_application_status = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = (
            'id', 'logo', 'name', 'description',
            'date', 'time', 'user_application_status',
            )

    def get_user_application_status(self, obj):
        request = self.context.get('request')
        if request.user.is_authenticated:
            user_profile = UserProfile.objects.filter(
                user=request.user
                ).first()
            if user_profile:
                user_event = UserEvent.objects.filter(
                    user_profile=user_profile, event=obj
                    ).first()
                if user_event:
                    return user_event.application_status
        return 'not_applied'


class EventDetailSerializer(serializers.ModelSerializer):
    """Сериализатор для подробной информации от эвенте."""
    speakers = SpeakerSerializer(read_only=True, many=True)
    form_template = FormTemplateSerializer(read_only=True)

    class Meta:
        model = Event
        fields = '__all__'
