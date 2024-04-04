from django.db import models


class Country(models.Model):
    name = models.CharField(max_length=255)
    index = models.IntegerField()

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=255)
    country_id = models.ForeignKey(
        Country,
        on_delete=models.CASCADE
        )

    def __str__(self):
        return self.name


class FamilyStatus(models.Model):
    familystatus = models.CharField(max_length=255)

    def __str__(self):
        return self.familystatus


class Income(models.Model):
    income = models.CharField(max_length=255)

    def __str__(self):
        return self.income


class Education(models.Model):
    education = models.CharField(max_length=255)

    def __str__(self):
        return self.education


class Notification(models.Model):
    notification = models.CharField(max_length=255)

    def __str__(self):
        return self.notification
