from django.db import models
from django.utils.translation import gettext_lazy as _


class Speaker(models.Model):
    foto = models.ImageField(
        verbose_name=_("Фото спикера"),
        upload_to='images/',
        blank=False,
    )
    name = models.CharField(
        verbose_name=_("Фамилия Имя"),
        max_length=200,
        blank=False,
    )
    specialization = models.CharField(
        verbose_name=_("Специлизация"),
        max_length=200,
        blank=False,
    )
    info = models.TextField(
        verbose_name=_("Дополнительная информация"),
        max_length=500,
        blank=False,
    )

    def __str__(self):
        return self.name


class Event(models.Model):
    logo = models.ImageField(
        verbose_name=_("Логотип"),
        upload_to='images/',
        blank=False,
    )
    name = models.CharField(
        verbose_name=_("Название"),
        max_length=200,
        blank=False,
    )
    data = models.DateField(
        verbose_name=_("Дата проведения"),
        blank=False,
    )
    time = models.TimeField(
        verbose_name=_("Время проведения"),
        blank=False,
    )
    position = models.CharField(
        verbose_name=_("Место проведения"),
        max_length=200,
        blank=False,
    )
    description = models.TextField(
        verbose_name=_("Описание"),
        max_length=1000,
        blank=False,
    )
    gallery = models.ImageField(
        verbose_name=_("Галерея"),
        upload_to='images/',
        blank=False,
    )
    speakers = models.ManyToManyField(
        Speaker,
        related_name="event_speaker",
        verbose_name=_("Спикеры на эвент"),
        blank=False,
    )
    online = models.BooleanField(
        verbose_name=_("Онлайн"),
        default=False,
    )

    def __str__(self):
        return self.name