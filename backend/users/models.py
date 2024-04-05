from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    )
from users.managers import CustomUserManager
from additions.models import (
    Country, FamilyStatus, Education, Income, Notification
    )


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    user_photo = models.ImageField(blank=True, upload_to='user_photo/',)
    agreement_required = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class UserProfile(models.Model):
    """
    User profile.
    В проекте имеем 2 роли, которые практически не совпадают
    по функционалу:
    1. Собственно Пользователь с кучей обязательных полей,
    если авторизирован - это и есть 'User profile', и
    2. Админ. Для него более чем достаточно и обычного User
    которого мы модернизировали выше
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=255)
    place_of_work = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    online = models.BooleanField(default=False)
    agreement_optional = models.BooleanField(default=False)
    specialization = models.ForeignKey(
        'Specialization', on_delete=models.CASCADE
    )
    experience = models.ForeignKey(
        'Experience', on_delete=models.CASCADE
    )
    #  необязательные поля:
    date_of_birth = models.DateField(blank=True, null=True)
    familystatus = models.ForeignKey(
        FamilyStatus, on_delete=models.CASCADE, blank=True, null=True
        )
    education = models.ForeignKey(
        Education, on_delete=models.CASCADE, blank=True, null=True
        )
    income = models.ForeignKey(
        Income, on_delete=models.CASCADE, blank=True, null=True
        )
    notification = models.ForeignKey(
        Notification, on_delete=models.CASCADE, default=None, null=True
        )
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE, blank=True, null=True
        )
    hobby = models.TextField(blank=True, null=True)
    values = models.TextField(blank=True, null=True)
    aims = models.TextField(blank=True, null=True)
    cv = models.TextField(blank=True, null=True)
    motivation = models.TextField(blank=True, null=True)

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
