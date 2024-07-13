from django.contrib import admin

from .models import UserEvent, UserProfileSnapshot


@admin.register(UserEvent)
class UserEventAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in UserEvent._meta.fields
        ]


@admin.register(UserProfileSnapshot)
class UserProfileSnapshotAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in UserProfileSnapshot._meta.fields
        ]
