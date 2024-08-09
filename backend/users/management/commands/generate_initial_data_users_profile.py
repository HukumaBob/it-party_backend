from backend import settings
from users.models import User, UserProfile, Experience, Specialization, Stack
from additions.models import (
    Country, FamilyStatus, Education, Income, Notification
)
from django.core.management.base import BaseCommand
from mixer.backend.django import mixer
from faker import Faker

fake = Faker(locale=settings.LANGUAGE_CODE)  # Генерация данных на русском языке
RANGE = 20

class Command(BaseCommand):
    help = 'Generate test users and their profiles'

    def handle(self, *args, **options):
        # Генерация пользователей и их профилей
        for _ in range(RANGE):
            user = mixer.blend(
                User,
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                date_of_birth=fake.date_of_birth(),
                phone_number=fake.phone_number(),
                email=fake.email(),
                is_active=True
            )
            user.set_password("Bobobo67")
            user.save()

            specialization_instance = Specialization.objects.order_by('?').first()
            # Получение уже существующего профиля пользователя
            profile = user.userprofile
            profile.phone = fake.phone_number()
            profile.place_of_work = fake.company()
            profile.position = fake.job()
            profile.online = fake.boolean()
            profile.agreement_optional = fake.boolean()
            profile.specialization = specialization_instance
            profile.experience = Experience.objects.order_by('?').first()
            profile.date_of_birth = fake.date_of_birth()
            profile.familystatus = FamilyStatus.objects.order_by('?').first()
            profile.education = Education.objects.order_by('?').first()
            profile.income = Income.objects.order_by('?').first()
            profile.notification = Notification.objects.order_by('?').first()
            profile.country = Country.objects.order_by('?').first()
            profile.hobby = fake.text()
            profile.values = fake.text()
            profile.aims = fake.text()
            profile.cv = fake.text()
            profile.motivation = fake.text()
            profile.save()

            # Получаем случайное количество стеков (от 1 до 3)
            num_stacks = fake.random.randint(1, 3)
            random_stacks = Stack.objects.filter(specialization=specialization_instance.index).order_by('?')[:num_stacks]

            for stack in random_stacks:
                profile.stacks.add(stack)  # Добавляем стеки к профилю пользователя

            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully created user '
                    f'"{user.email}" and their profile'
                )
            )
