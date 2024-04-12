from django.db import models
from django.utils.translation import gettext_lazy as _


class Speaker(models.Model):
    foto = models.ImageField(
        verbose_name=_("Фото спикера"),
        upload_to='images/',
        blank=False, null=True,
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


class FormTemplate(models.Model):
    fields = models.JSONField()  # базовый шаблон

    def __str__(self):
        return str(self.fields)


def get_default_fields():
    return {"first_name": "", "phone": ""}


class EventFormTemplate(models.Model):
    event = models.OneToOneField('Event', on_delete=models.CASCADE)
    form_template = models.ForeignKey(
        FormTemplate, on_delete=models.CASCADE,
        blank=True,
        null=True
        )  # ссылка на базовый шаблон, каждый экземпляр
    fields = models.JSONField(default=get_default_fields)
    # дополнительные или измененные поля

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
    event_form_template = models.OneToOneField(
        EventFormTemplate,
        on_delete=models.CASCADE,
        related_name='related_event',
        null=True,
        blank=True
    )

    def __str__(self):
        return self.name
