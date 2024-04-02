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
