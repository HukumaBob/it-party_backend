from users.models import User
from django.core.management.base import BaseCommand
from mixer.backend.django import mixer
from faker import Faker

fake = Faker()


class Command(BaseCommand):
    help = 'Generate test users'

    def handle(self, *args, **options):
        # Генерация пользователей
        for _ in range(20):
            user = mixer.blend(
                User,
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                date_of_birth=fake.date_of_birth(),
                phone_number=fake.phone_number(),
                email=fake.email(),
                password=fake.password(),
                is_active=True
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully created user {user.first_name}'
                )
            )            
