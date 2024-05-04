from django.contrib import admin

from .models import (
    ChatMessage,
    )


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in ChatMessage._meta.fields
        ]
