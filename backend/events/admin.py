from django.contrib import admin

from .models import (
    Event,
    Speaker,
    EventFormTemplate
    )


@admin.register(Speaker)
class SpeakerAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Speaker._meta.fields
        ]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Event._meta.fields
        ]


@admin.register(EventFormTemplate)
class EventFormTemplateAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in EventFormTemplate._meta.fields
        ]
