from django.db import models
from django.utils.translation import gettext_lazy as _


class Country(models.Model):
    name = models.CharField(max_length=255, verbose_name=_("Country Name"))
    index = models.IntegerField(verbose_name=_("Index"))

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=255, verbose_name=_("City Name"))
    country_id = models.ForeignKey(
        Country,
        on_delete=models.CASCADE,
        verbose_name=_("Country ID")
    )

    def __str__(self):
        return self.name


class FamilyStatus(models.Model):
    familystatus = models.CharField(max_length=255, verbose_name=_("Family Status"))

    def __str__(self):
        return self.familystatus


class Income(models.Model):
    income = models.CharField(max_length=255, verbose_name=_("Income"))

    def __str__(self):
        return self.income


class Education(models.Model):
    education = models.CharField(max_length=255, verbose_name=_("Education"))

    def __str__(self):
        return self.education


class Notification(models.Model):
    notification = models.CharField(max_length=255, verbose_name=_("Notification"))

    def __str__(self):
        return self.notification
