from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    agreement_required = serializers.BooleanField()

    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'agreement_required')

    def create(self, validated_data):
        agreement_required = validated_data.pop('agreement_required', None)
        if agreement_required is not True:
            raise ValidationError(
                {
                    "agreement_required":
                    "Вы должны согласиться с условиями использования."
                    }
                )
        user = super().create(validated_data)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    user_photo = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = '__all__'

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

    def get_user_photo(self, obj):
        return obj.user.user_photo.url if obj.user.user_photo else None
