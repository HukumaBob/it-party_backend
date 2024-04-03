from django.contrib import admin

from .models import (
    User,
    UserProfile,
    Specialization,
    Experience)

admin.site.site_header = 'Site administration'


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in User._meta.fields
        ]


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in UserProfile._meta.fields
        ]


@admin.register(Specialization)
class SpecializationAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Specialization._meta.fields
        ]


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Experience._meta.fields
        ]
