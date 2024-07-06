from rest_framework import serializers

from users.serializers import UserProfileSerializer
from userevents.serializers import UserEventSerializer

from .models import (
    Event,
    EventGallery,
    Speaker,
    FormTemplate,
    )
from userevents.models import UserEvent
from users.models import UserProfile, Specialization


class FormTemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = FormTemplate
        fields = '__all__'


class SpeakerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Speaker
        fields = '__all__'

class EventGallerySerializer(serializers.ModelSerializer):

    class Meta:
        model = EventGallery
        fields = '__all__'



class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    """Главная страница списка эвентов."""
    description = serializers.CharField(max_length=100)
    user_application_status = serializers.SerializerMethodField()
    specializations = SpecializationSerializer(many=True)

    class Meta:
        model = Event
        fields = (
            'id', 'logo', 'name', 'description',
            'date', 'time', 'user_application_status',
            'specializations',
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
    gallery = EventGallerySerializer(read_only=True, many=True)
    form_template = FormTemplateSerializer(read_only=True)
    specializations = SpecializationSerializer(read_only=True, many=True)
    

    class Meta:
        model = Event
        fields = '__all__'

class AdminEventSerializer(serializers.ModelSerializer):
    application_status_counts = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ('id', 'name', 'application_status_counts',)

    def get_application_status_counts(self, obj):
        # Получаем все связанные инстансы UserEvent для данного ивента
        user_events = obj.user_events.all()

        # Создаем словарь для подсчета статусов
        status_counts = {
            'is_favorite': 0,
            'pending': 0,
            'approved': 0,
            'rejected': 0,
        }

        # Подсчитываем количество инстансов для каждого статуса
        for user_event in user_events:
            status_counts[user_event.application_status] += 1

        return status_counts

class AdminUserEventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('id',)
     
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Получите данные профиля пользователя по айди
        profile_events_data = UserProfileSerializer(instance.user_profile).data

        # Объедините данные профиля пользователя и айди связи user-event
        representation['profile_events'] = profile_events_data
        representation['application_status'] = instance.application_status


        return representation

