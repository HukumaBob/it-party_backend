# Импорт необходимых модулей и классов
from django.contrib.auth.tokens import default_token_generator
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserProfile
from .serializers import UserProfileSerializer


# Класс для активации аккаунта пользователя
class ActivateAccountView(APIView):
    """
    Представление для активации аккаунта пользователя.
    Обрабатывает GET-запросы с uid и токеном для активации аккаунта.
    Сам эндпоинт указан в settings.py в настройках DJOSER
    """
    def get(self, request, uidb64, token):
        # Получаем модель пользователя
        User = get_user_model()
        try:
            # Декодируем uid
            uid = urlsafe_base64_decode(uidb64).decode()
            # Получаем пользователя по uid
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        # Если пользователь существует и токен верный
        if user is not None and default_token_generator.check_token(
            user, token
                ):
            # Активируем пользователя
            user.is_active = True
            user.save()
            # Возвращаем сообщение об успешной активации
            return Response(
                'Спасибо за подтверждение вашего электронного адреса. '
                'Теперь вы можете войти в свой аккаунт.',
                status=status.HTTP_200_OK
                )
        else:
            # Возвращаем сообщение об ошибке
            return Response(
                'Ссылка для активации недействительна!',
                status=status.HTTP_400_BAD_REQUEST)


# Класс для работы с профилем пользователя через API
class UserProfileViewSet(viewsets.ModelViewSet):
    """
    Представление для работы с профилем пользователя.
    Позволяет создавать, редактировать,
    просматривать и удалять профили пользователей.
    """
    # Указываем набор данных и сериализатор
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
