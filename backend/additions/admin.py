from django.contrib import admin

from .models import (
    City,
    Country,
    Education,
    FamilyStatus,
    Income,
    )


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


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Education._meta.fields
        ]


@admin.register(FamilyStatus)
class FamilyStatusAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in FamilyStatus._meta.fields
        ]


@admin.register(Income)
class IncomeAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Income._meta.fields
        ]
