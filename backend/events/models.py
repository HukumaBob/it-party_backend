from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _
from additions.models import City
from users.models import Specialization


class Speaker(models.Model):
    foto = models.ImageField(
        verbose_name=_("Фото спикера"),
        upload_to='images/',
        blank=True, null=True,
    )
    name = models.CharField(
        verbose_name=_("Фамилия Имя"),
        max_length=200,
        blank=False,
    )
    specializations = models.ManyToManyField(Specialization) 
    info = models.TextField(
        verbose_name=_("Дополнительная информация"),
        max_length=500,
        blank=True,
        null=False
    )

    def __str__(self):
        return self.name


def get_default_fields():
    return {
        "first_name": "",
        "last_name": "",
        "date_of_birth": "",
        "place_of_work": "",
        "position": "",
        "specialization": "",
        "experience": "",
        "phone": "",
        "online": False
        }


class FormTemplate(models.Model):
    name = models.CharField(_("Name"), max_length=200)
    fields = models.JSONField(default=get_default_fields)  # базовый шаблон

    def __str__(self):
        return str(self.fields)


class Event(models.Model):
    logo = models.ImageField(
        verbose_name=_("Логотип"),
        upload_to='images/',
        blank=False, null=True,
    )
    name = models.CharField(
        verbose_name=_("Название"),
        max_length=200,
        blank=False,
    )
    date = models.DateField(
        verbose_name=_("Дата проведения"),
        blank=False,
    )
    time = models.TimeField(
        verbose_name=_("Время проведения"),
        blank=False,
    )
    city = models.ForeignKey(
        City,
        on_delete=models.CASCADE,
        blank=False,
        null=True,
    )
    specializations = models.ManyToManyField(
        Specialization,
        related_name="events",
        verbose_name=_("Специализации на эвенте"),
        blank=True,
    )
    address = models.CharField(
        verbose_name=_("Адрес места проведения"),
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
        blank=False, null=True,
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
    offline = models.BooleanField(
        verbose_name=_("Офлайн"),
        default=False,
    )
    form_template = models.OneToOneField(
        FormTemplate,
        on_delete=models.CASCADE,
        related_name='related_event',
        null=True,
        blank=True
    )
    record_link = models.URLField(blank=True, null=True,)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='created_events',
        verbose_name=_("Создатель ивента"),
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        null=True,
        blank=True,
        verbose_name=_("Дата создания"),
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        null=True,
        blank=True,
        verbose_name=_("Дата обновления"),
    )

    def __str__(self):
        return self.name
