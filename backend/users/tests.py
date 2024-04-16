from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.test import TestCase
from django.urls import reverse
from users.models import User, UserProfile


class UserProfileViewSetTestCase(TestCase):

    def setUp(self):
        """
        Настройка тестового окружения. Создает пользователя и профиль,
        а также генерирует и устанавливает токен доступа.
        """
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpassword1',
            is_active=True
        )
        self.profile = UserProfile.objects.create(
            user=self.user, phone='1234567890'
        )

        # Generate access token using refresh token
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {self.access_token}'
            )

    def test_get_user_profile(self):
        """
        Тест на получение профиля пользователя. Проверяет, что сервер
        возвращает код статуса 200 и корректные данные профиля.
        """
        response = self.client.get(
            reverse('users:profile-detail', kwargs={'pk': 'me'})
            )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['phone'], '1234567890')

    def test_update_user_profile(self):
        """
        Тест на обновление профиля пользователя. Проверяет, что сервер
        возвращает код статуса 200 и обновленные данные профиля.
        """
        new_phone = '0987654321'
        response = self.client.patch(
            reverse('users:profile-detail', kwargs={'pk': 'me'}),
            data={'phone': new_phone}
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['phone'], new_phone)

    def test_delete_user_profile(self):
        """
        Тест на удаление профиля пользователя. Проверяет, что сервер
        возвращает код статуса 204 после удаления профиля.
        """
        response = self.client.delete(
            reverse('users:profile-detail', kwargs={'pk': 'me'})
        )
        self.assertEqual(response.status_code, 204)

    def test_get_other_user_profile(self):
        """
        Тест на получение профиля другого пользователя. Проверяет, что сервер
        возвращает код статуса 403 при попытке получить
        профиль другого пользователя.
        """
        other_user = User.objects.create_user(
            email='other@example.com', password='testpassword2'
        )
        UserProfile.objects.create(
            user=other_user, phone='1122334455'
        )

        response = self.client.get(
            reverse('users:profile-detail', kwargs={'pk': other_user.pk})
        )
        # Замените код статуса на тот, который вы ожидаете получить
        self.assertEqual(response.status_code, 403)

    def test_inactive_user(self):
        """
        Тест на обработку неактивного пользователя. Проверяет, что сервер
        возвращает код статуса 401 при попытке получить
        профиль неактивного пользователя.
        """
        self.user.is_active = False
        self.user.save()

        response = self.client.get(
            reverse('users:profile-detail', kwargs={'pk': 'me'})
        )
        self.assertEqual(response.status_code, 401)

    # def test_invalid_password(self):
    #     response = self.client.patch(
    #         reverse('user-me'),
    #         data={'password': 'invalid'}
    #     )
    #     self.assertEqual(response.status_code, 400)

    def test_activate_account(self):
        """
        Тест на активацию аккаунта. Проверяет, что сервер возвращает
        код статуса 200 и активирует аккаунт после получения
        корректного uid и токена.
        """
        user = User.objects.create_user(
            email='test2@example.com',
            password='testpassword2',
            is_active=False
        )
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        response = self.client.get(
            reverse('users:activate', kwargs={'uidb64': uid, 'token': token})
        )
        user.refresh_from_db()

        self.assertEqual(response.status_code, 200)
        self.assertTrue(user.is_active)
