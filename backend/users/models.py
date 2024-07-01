from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
)
from django.utils.translation import gettext_lazy as _
from users.managers import CustomUserManager
from additions.models import (
    Country, FamilyStatus, Education, Income, Notification
)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(max_length=30, blank=True, null=True, )
    last_name = models.CharField(max_length=30, blank=True, null=True,)
    date_joined = models.DateTimeField(auto_now_add=True)
    user_photo = models.ImageField(
        blank=True, upload_to='user_photo/', verbose_name=_("Фотография пользователя")
        )
    agreement_required = models.BooleanField(
        default=True, verbose_name=_("Обязательное согласие")
        )

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

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, verbose_name=_("Юзер")
        )
    phone = models.CharField(
        max_length=255, blank=True, null=True, verbose_name=_("Телефон")
        )
    place_of_work = models.CharField(
        max_length=255, blank=True, null=True, verbose_name=_("Место работы")
        )
    position = models.CharField(
        max_length=255, blank=True, null=True, verbose_name=_("Должность")
        )
    online = models.BooleanField(default=False, verbose_name=_("Онлайн"))
    offline = models.BooleanField(default=False, verbose_name=_("Офлайн"))
    agreement_optional = models.BooleanField(
        default=False, verbose_name=_("Agreement Optional")
        )
    specialization = models.ForeignKey(
        'Specialization', on_delete=models.CASCADE,
        blank=True, null=True, verbose_name=_("Специализация")
    )
    stacks = models.ManyToManyField(
        'Stack', blank=True, verbose_name=_("Стеки")
    )
    experience = models.ForeignKey(
        'Experience', on_delete=models.CASCADE,
        blank=True, null=True, verbose_name=_("Опыт")
    )
    #  необязательные поля:
    date_of_birth = models.DateField(
        blank=True, null=True, verbose_name=_("Дата рождения")
        )
    familystatus = models.ForeignKey(
        FamilyStatus, on_delete=models.CASCADE,
        blank=True, null=True, verbose_name=_("Семейное положение")
    )
    education = models.ForeignKey(
        Education, on_delete=models.CASCADE, blank=True,
        null=True, verbose_name=_("Образование")
    )
    income = models.ForeignKey(
        Income, on_delete=models.CASCADE,
        blank=True, null=True, verbose_name=_("Доход")
    )
    notification = models.ForeignKey(
        Notification, on_delete=models.CASCADE,
        blank=True, null=True, verbose_name=_("Уведомление")
    )
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE,
        blank=True, null=True, verbose_name=_("Страна")
    )
    hobby = models.TextField(
        blank=True, null=True, verbose_name=_("Хобби")
        )
    values = models.TextField(
        blank=True, null=True, verbose_name=_("Жизненные ценности")
        )
    aims = models.TextField(
        blank=True, null=True, verbose_name=_("Жизненные цели")
        )
    cv = models.TextField(
        blank=True, null=True, verbose_name=_("Автобиография")
        )
    motivation = models.TextField(
        blank=True, null=True, verbose_name=_("Мотивации")
        )

    def __str__(self):
        return f'{self.user}'


class Experience(models.Model):
    experience = models.CharField(
        max_length=255, verbose_name=_("Опыт")
        )

    def __str__(self):
        return f'{self.experience}'


class Specialization(models.Model):
    specialization = models.CharField(
        max_length=255, verbose_name=_("Направление")
        )
    index = models.IntegerField(unique=True, verbose_name=_("Index"))

    def __str__(self):
        return f'{self.specialization}'


class Stack(models.Model):
    name = models.CharField(
        max_length=255, verbose_name=_("Стек")
    )
    specialization = models.ForeignKey(
        Specialization,
        on_delete=models.CASCADE,
        verbose_name=_("Направление"),
        to_field="index",
    )

    def __str__(self):
        return self.name
