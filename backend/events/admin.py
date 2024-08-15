from django.contrib import admin

from .models import (
    Event,
    Speaker,
    FormTemplate,
    RejectionReason,
    EventGallery,
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


@admin.register(FormTemplate)
class FormTemplateAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in FormTemplate._meta.fields
        ]


@admin.register(RejectionReason)
class EventFormTemplateAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in RejectionReason._meta.fields
        ]


@admin.register(EventGallery)
class EventGalleryAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in EventGallery._meta.fields
        ]