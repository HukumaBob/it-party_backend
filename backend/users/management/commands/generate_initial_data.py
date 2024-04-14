import csv
from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import models
from users.models import (
    Experience,
    Specialization,
    Stack
    )
from additions.models import (
    City, Country, FamilyStatus, Income,
    Education, Notification
    )


class Command(BaseCommand):
    help = 'Generate data'

    def load_from_csv(self, model):
        model_name = model.__name__.lower()
        with open(
            settings.BASE_DIR / f'data/{model_name}.csv', 'r', encoding='utf-8'
                ) as f:
            reader = csv.DictReader(f)
            for row in reader:
                for field in model._meta.fields:
                    if isinstance(field, models.ForeignKey):
                        related_model = field.related_model
                        row[field.name] = related_model.objects.get(
                            index=int(row[field.name])
                            )
                model.objects.create(**row)

    def handle(self, *args, **options):
        # Загрузка специализаций
        self.load_from_csv(Specialization)
    
        # Загрузка стек
        self.load_from_csv(Stack)

        # # # Загрузка опыта работы
        self.load_from_csv(Experience)

        # # Загрузка стран
        self.load_from_csv(Country)

        # # Загрузка городов
        self.load_from_csv(City)

        # Загрузка образования
        self.load_from_csv(Education)

        # Загрузка семейного положения
        self.load_from_csv(FamilyStatus)

        # Загрузка дохода
        self.load_from_csv(Income)

        # Загрузка дохода
        self.load_from_csv(Notification)

        self.stdout.write(
            self.style.SUCCESS(
                'Successfully created initial data'
            )
        )
