import re
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import (
    User, UserProfile, Specialization, Stack, Experience
    )


def validate_password(value):
    if len(value) < 8:
        raise ValidationError(
            _('Пароль должен содержать не менее 8 символов.')
            )
    if not re.search('[A-Za-z]', value):
        raise ValidationError(
            _('Пароль должен содержать хотя бы одну латинскую букву.')
            )
    if not re.search(r'\d', value):
        raise ValidationError(
            _('Пароль должен содержать хотя бы одну цифру.')
            )
    if not re.search(r'^[\w@%&$*#^-]+$', value):
        raise ValidationError(
            _(
                'Пароль может содержать только латинские '
                'буквы, цифры и специальные символы.'
                )
            )


class UserSerializer(serializers.ModelSerializer):
    agreement_required = serializers.BooleanField()

    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'agreement_required')
        ref_name = 'UserSerializer1'
        #  два разных сериализатора(djoser.serializers.UserSerializer
        #  и users.serializers.UserSerializer)
        #  неявно используют одно и то же имя ссылки (ref_name).
        #  Это приводит к конфликту, поскольку drf_yasg пытается
        #  создать две разные схемы с одним и тем же ref_name. Поэтому
        #  такое странное имя

    def create(self, validated_data):
        agreement_required = validated_data.pop('agreement_required', None)
        if agreement_required is not True:
            raise ValidationError(
                {
                    "agreement_required":
                    _("Вы должны согласиться с условиями использования.")
                    }
                )
        #  Djoser сохраняет пароль в открытом виде, поэтому приходится
        #  удалять пароль и после хеширования засовывать обратно.
        #  Иначе не дает токен.
        password = validated_data.pop('password')
        validate_password(password)
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user


class UserPassportSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'first_name', 'last_name',
            'email', 'user_photo',
            'id',
            )


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Подача на фронт полного профиля.
    Происходит объединение полей User и User Profile, поэтому
    добавлены методы create и update.
    Чтобы в Response были данные и User, добавлен сериализатор
    UserPassportSerializer и метод to_representation
    """
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    first_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    last_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    user_photo = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = UserProfile
        fields = '__all__'

    def create(self, validated_data):
        # Получаем текущего авторизованного пользователя
        user = self.context['request'].user
        # Проверяем, существует ли уже профиль для этого пользователя
        if UserProfile.objects.filter(user=user).exists():
            raise serializers.ValidationError(
                "Профиль для этого пользователя уже существует"
                )

        first_name = validated_data.pop('first_name', None)
        last_name = validated_data.pop('last_name', None)
        user_photo = validated_data.pop('user_photo', None)

        if first_name is not None:
            user.first_name = first_name
        if last_name is not None:
            user.last_name = last_name
        if user_photo is not None:
            user.user_photo = user_photo

        user.save()

        instance = UserProfile.objects.create(user=user, **validated_data)
        return instance

    def update(self, instance, validated_data):
        first_name = validated_data.pop('first_name', None)
        last_name = validated_data.pop('last_name', None)
        user_photo = validated_data.pop('user_photo', None)

        if first_name is not None:
            instance.user.first_name = first_name
        if last_name is not None:
            instance.user.last_name = last_name
        if user_photo is not None:
            instance.user.user_photo = user_photo

        instance.user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user_representation = UserPassportSerializer(instance.user).data
        # получите данные пользователя
        return {**representation, **user_representation}
    # объедините данные пользователя и профиля пользователя


class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        ref_name = 'SpecializationSerializer1'
        model = Specialization
        fields = '__all__'


class StackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stack
        fields = '__all__'


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'
