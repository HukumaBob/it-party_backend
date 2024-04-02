from django.contrib import admin

from .models import City, Country


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in City._meta.fields
        ]


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Country._meta.fields
        ]
