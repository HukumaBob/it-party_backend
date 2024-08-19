import glob
import pandas as pd
import os
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile

from backend import settings
from faker import Faker
from events.models import Event, Speaker, Specialization, EventGallery
from additions.models import City
import random

fake = Faker(locale= settings.LANGUAGE_CODE)
RANGE = 50

class Command(BaseCommand):
    
    help = 'Generate test events'
    current_index = None

    def handle(self, *args, **options):
        for _ in range(RANGE):
            # Generate an event
            event = Event.objects.create(
                logo=self.get_real_image('test_logo'),  # Замена логотипа на реальный файл
                name=self.get_csv_value('events', 'name'),
                date=fake.date_between(start_date='-1y', end_date='+1y'),
                time=fake.time(),
                city=City.objects.order_by('?').first(),
                address=self.get_csv_value('events', 'address'),
                description=self.get_csv_value('events', 'description'),
                online=fake.boolean()
            )

            # Generate 1-4 specializations and attach them to the event
            specializations = Specialization.objects.order_by('?')[:random.randint(1, 4)]
            event.specializations.set(specializations)

            # Generate 4-5 speakers and attach them to the event
            for _ in range(random.randint(4, 5)):
                speaker = Speaker.objects.create(
                    foto=self.get_real_image('test_users'),  # Замена фото спикера на реальное изображение
                    name=fake.name(),
                    info=fake.text(max_nb_chars=50)
                )
                speaker.specializations.set([random.choice(specializations)])
                event.speakers.add(speaker)

            for _ in range(random.randint(4, 5)):
                event_gallery = EventGallery.objects.create(
                    event_photo=self.get_real_image('test_gallery'),  # Замена фото галереи на реальное изображение
                    caption=fake.text(max_nb_chars=30),
                )
                event.gallery.add(event_gallery)

            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully created event "{event.name}"'
                )
            )

    def get_real_image(self, folder_name):
        # Получение списка всех файлов из указанной директории
        image_files = glob.glob(f'media/{folder_name}/*.jpg') 

        if image_files:
            # Выбор случайного файла из списка
            random_image_path = random.choice(image_files)

            # Чтение содержимого файла
            with open(random_image_path, 'rb') as image_file:
                image_content = image_file.read()

            # Возвращение объекта ContentFile с содержимым файла
            return ContentFile(image_content, os.path.basename(random_image_path))
        else:
            # Если файлов нет, вернуть None или другое значение по вашему усмотрению
            return None

    def get_csv_value(self, file_name, field_name):
        # Предполагается, что у вас есть файл events.csv в папке media
        csv_path = settings.BASE_DIR / f'data/{file_name}.csv'
        try:
            # Чтение CSV файла в DataFrame
            df = pd.read_csv(csv_path)

            # Если текущий индекс не установлен, выбираем случайный индекс
            if self.current_index is None:
                self.current_index = 0

            self.current_index = self.current_index % RANGE
            # Получение значения из текущей строки
            value = df.loc[self.current_index, field_name]

            # Увеличиваем индекс для следующего вызова
            self.current_index = (self.current_index + 1) % len(df)

            return value
        except FileNotFoundError:
            # Обработка случая, если файл не найден
            return None
        except KeyError:
            # Обработка случая, если поле не существует в файле
            return None