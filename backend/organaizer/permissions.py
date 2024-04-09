from rest_framework import permissions


class IsOrganizator(permissions.BasePermission):
    """
    Проверка, является ли пользователь организатором данного события
    """
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user