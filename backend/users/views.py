from django.contrib.auth.views import PasswordResetConfirmView
from django.views.generic import TemplateView
from django.shortcuts import redirect
from django.contrib import messages
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.tokens import default_token_generator
from rest_framework import mixins, viewsets, permissions
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.translation import gettext_lazy as _
from .models import (
    UserProfile,
    Specialization,
    Stack,
    Experience,
    )
from .permissions import IsOwnerOrAdmin
from .serializers import (
    UserProfileSerializer,
    SpecializationSerializer,
    StackSerializer,
    ExperienceSerializer
    )


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
                    {'detail': _(
                        'Спасибо за подтверждение вашего электронного адреса. '
                        'Теперь вы можете войти в свой аккаунт.'
                        )},
                    status=status.HTTP_200_OK
                        )
        else:
            # Возвращаем сообщение об ошибке
            return Response(
                {'detail': _('Ссылка для активации недействительна!')},
                status=status.HTTP_400_BAD_REQUEST)


# Аналогичный класс для восстановления пароля
class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    # template_name = 'users/password_reset_form.html'

    def form_valid(self, form):
        """
        Обработка формы после успешного ввода нового пароля.
        """
        form.save()
        messages.success(self.request, _('Пароль успешно обновлен.'))
        return redirect('users:success')
    
class SuccessView(TemplateView):
    template_name = 'users/success.html'    

# Если надо удалить пользователя полностью...
class DeleteUser(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        user.delete()
        return Response({"result": _('Пользователь удален')})

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
    permission_classes = [IsOwnerOrAdmin]

    def get_object(self):
        if self.kwargs.get('pk') == 'me':
            return UserProfile.objects.get(user=self.request.user)
        return super().get_object()


class SpecializationViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = Specialization.objects.all()
    serializer_class = SpecializationSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class StackViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = Stack.objects.all()
    serializer_class = StackSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class ExperienceViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
        ):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None
