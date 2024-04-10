from django.contrib import admin

from .models import Organizator


@admin.register(Organizator)
class OrganizatorAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Organizator._meta.fields
        ]
