from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    """
    User profile.
    В проекте имеем 2 роли, которые практически не совпадают
    по функционалу:
    1. Собственно Пользователь с кучей обязательных полей,
    если авторизирован - это и есть 'User profile', и
    2. Админ. Для него более чем достаточно и стандартного User
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=255)
    place_of_work = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    online = models.BooleanField(default=False)
    agreement_required = models.BooleanField(default=True)
    agreement_optional = models.BooleanField(default=False)
    specialization = models.ForeignKey(
        'Specialization', on_delete=models.CASCADE
    )
    experience = models.ForeignKey(
        'Experience', on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.user}'


class Experience(models.Model):
    experience = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.experience}'


class Specialization(models.Model):
    specialization = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.specialization}'
