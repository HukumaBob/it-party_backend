from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from users.models import User
from .models import Event, Speaker, FormTemplate, City, Specialization
from additions.models import Country

class EventViewSetTestCase(APITestCase):

    def setUp(self):
        """
        Настройка тестового окружения. Создает пользователя, спикера, форму, город, специализацию и событие,
        а также генерирует и устанавливает токен доступа.
        """
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpassword1',
            is_active=True,
            is_staff=True
        )
        self.speaker = Speaker.objects.create(
            name='Test Speaker',
            specialization='Test Specialization',
            info='Test Info'
        )
        self.form_template = FormTemplate.objects.create(
            name='Test FormTemplate',
            fields={'first_name': '', 'last_name': '', }
        )
        self.country = Country.objects.create(
            name='Test Country',
            index=123
        )
        self.city = City.objects.create(
            name='Test City',
            country_id=self.country
        )
        self.specialization = Specialization.objects.create(
            specialization='Test Specialization',
            index = 1
        )
        self.event = Event.objects.create(
            name='Test Event',
            date='2024-05-06',
            time='18:43:44',
            city=self.city,
            address='Test Address',
            description='Test Description',
            online=True,
            offline=False,
            form_template=self.form_template,
            created_by=self.user
        )
        self.event.speakers.add(self.speaker)
        self.event.specializations.add(self.specialization)

        # Generate access token using refresh token
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.client.credentials(
            HTTP_AUTHORIZATION=f'Bearer {self.access_token}'
            )

    def test_get_event_list(self):
        """
        Тест на получение списка событий. Проверяет, что сервер
        возвращает код статуса 200 и корректные данные.
        """
        response = self.client.get(reverse('events:events-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 1)

    def test_get_event_detail(self):
        """
        Тест на получение детальной информации о событии. Проверяет, что сервер
        возвращает код статуса 200 и корректные данные.
        """
        response = self.client.get(
            reverse('events:events-detail', kwargs={'pk': self.event.pk})
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Test Event')

    def test_create_event(self):
        """
        Тест на создание события. Проверяет, что сервер
        возвращает код статуса 201 и корректные данные.
        """
        new_event_data = {
            'name': 'New Test Event',
            'date': '2024-05-07',
            'time': '19:00:00',
            'city': self.city.pk,
            'address': 'New Test Address',
            'description': 'New Test Description',
            'online': True,
            'offline': False,
            'form_template': {
                "name": "Standart",
                "fields": {
                    "first_name": "",
                    "last_name": "",
                }
            },
            'speakers': [
                {
                    "name": "Victor",
                    "specialization": "Ambulance person",
                    "info": "Open case push."
                }
            ],
            'specializations': [{
                    "specialization": "Django",
                    "index": 1
                },]
        }
        response = self.client.post(
            reverse('events:events-list'),
            data=new_event_data,
            format='json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['name'], 'New Test Event')

    def test_update_event(self):
        """
        Тест на обновление события. Проверяет, что сервер
        возвращает код статуса 200 и обновленные данные.
        """
        updated_event_data = {'name': 'Updated Test Event'}
        response = self.client.patch(
            reverse('events:events-detail', kwargs={'pk': self.event.pk}),
            data=updated_event_data
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'Updated Test Event')

    def test_delete_event(self):
        """
        Тест на удаление события. Проверяет, что сервер
        возвращает код статуса 204 после удаления события.
        """
        response = self.client.delete(
            reverse('events:events-detail', kwargs={'pk': self.event.pk})
        )
        self.assertEqual(response.status_code, 204)
