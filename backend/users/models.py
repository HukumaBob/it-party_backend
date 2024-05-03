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
        blank=True, upload_to='user_photo/', verbose_name=_("User Photo")
        )
    agreement_required = models.BooleanField(
        default=True, verbose_name=_("Agreement Required")
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
        User, on_delete=models.CASCADE, verbose_name=_("User")
        )
    phone = models.CharField(
        max_length=255, blank=True, null=True, verbose_name=_("Phone")
        )
    place_of_work = models.CharField(
        max_length=255, blank=True, null=True, verbose_name=_("Place of Work")
        )
    position = models.CharField(
        max_length=255, blank=True, null=True, verbose_name=_("Position")
        )
    online = models.BooleanField(default=False, verbose_name=_("Online"))
    agreement_optional = models.BooleanField(
        default=False, verbose_name=_("Agreement Optional")
        )
    specialization = models.ForeignKey(
        'Specialization', on_delete=models.CASCADE,
        blank=True, null=True, verbose_name=_("Specialization")
    )
    experience = models.ForeignKey(
        'Experience', on_delete=models.CASCADE,
        blank=True, null=True, verbose_name=_("Experience")
    )
    #  необязательные поля:
    date_of_birth = models.DateField(
        blank=True, null=True, verbose_name=_("Date of Birth")
        )
    familystatus = models.ForeignKey(
        FamilyStatus, on_delete=models.CASCADE,
        blank=True, null=True, verbose_name=_("Family Status")
    )
    education = models.ForeignKey(
        Education, on_delete=models.CASCADE, blank=True,
        null=True, verbose_name=_("Education")
    )
    income = models.ForeignKey(
        Income, on_delete=models.CASCADE,
        blank=True, null=True, verbose_name=_("Income")
    )
    notification = models.ForeignKey(
        Notification, on_delete=models.CASCADE,
        blank=True, null=True, verbose_name=_("Notification")
    )
    country = models.ForeignKey(
        Country, on_delete=models.CASCADE,
        blank=True, null=True, verbose_name=_("Country")
    )
    hobby = models.TextField(
        blank=True, null=True, verbose_name=_("Hobby")
        )
    values = models.TextField(
        blank=True, null=True, verbose_name=_("Values")
        )
    aims = models.TextField(
        blank=True, null=True, verbose_name=_("Aims")
        )
    cv = models.TextField(
        blank=True, null=True, verbose_name=_("CV")
        )
    motivation = models.TextField(
        blank=True, null=True, verbose_name=_("Motivation")
        )

    def __str__(self):
        return f'{self.user}'


class Experience(models.Model):
    experience = models.CharField(
        max_length=255, verbose_name=_("Experience")
        )

    def __str__(self):
        return f'{self.experience}'


class Specialization(models.Model):
    specialization = models.CharField(
        max_length=255, verbose_name=_("Specialization")
        )
    index = models.IntegerField(verbose_name=_("Index"))

    def __str__(self):
        return f'{self.specialization}'


class Stack(models.Model):
    name = models.CharField(
        max_length=255, verbose_name=_("Stack Name")
        )
    specialization_id = models.ForeignKey(
        Specialization,
        on_delete=models.CASCADE,
        verbose_name=_("Stack ID")
    )

    def __str__(self):
        return self.name
