from rest_framework import permissions


class IsStaff(permissions.BasePermission):
    """
    Проверка, является ли пользователь сотрудником (staff)
    """
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff
