from users.models import User, UserProfile, Experience, Specialization, Stack
from additions.models import (
    Country, FamilyStatus, Education, Income, Notification
)
from django.core.management.base import BaseCommand
from mixer.backend.django import mixer
from faker import Faker

fake = Faker()

class Command(BaseCommand):
    help = 'Generate test users and their profiles'

    def handle(self, *args, **options):
        # Генерация пользователей и их профилей
        for _ in range(20):
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
            # Генерация профиля пользователя
            profile = UserProfile.objects.create(
                user=user,
                phone=fake.phone_number(),
                place_of_work=fake.company(),
                position=fake.job(),
                online=fake.boolean(),
                agreement_optional=fake.boolean(),
                specialization=specialization_instance,
                experience=Experience.objects.order_by('?').first(),
                date_of_birth=fake.date_of_birth(),
                familystatus=FamilyStatus.objects.order_by('?').first(),
                education=Education.objects.order_by('?').first(),
                income=Income.objects.order_by('?').first(),
                notification=Notification.objects.order_by('?').first(),
                country=Country.objects.order_by('?').first(),
                hobby=fake.text(),
                values=fake.text(),
                aims=fake.text(),
                cv=fake.text(),
                motivation=fake.text()
            )

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