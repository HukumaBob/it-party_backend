from pathlib import Path
import random
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import User, UserProfile
from django.core.files import File


@receiver(post_save, sender=User)
def set_random_user_photo(sender, instance, created, **kwargs):
    if created:
        # Путь к папке с изображениями

        path = Path(settings.MEDIA_ROOT) / 'animals'

        # Получаем список всех файлов в папке
        files = list(path.glob('*'))
        # Выбираем случайный файл
        random_file = random.choice(files)
        # Открываем случайное изображение и
        # устанавливаем его как фото пользователя
        with open(random_file, 'rb') as file:
            instance.user_photo.save(random_file.name, File(file), save=True)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    # Проверяем, что объект User создан, а не просто обновлен
    if created:
        # Создаем связанный UserProfile
        UserProfile.objects.create(user=instance)