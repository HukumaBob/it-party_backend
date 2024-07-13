from rest_framework import permissions


class IsStaffOrReadOnly(permissions.BasePermission):
    """
    Разрешение, которое позволяет только персоналу редактировать объекты.
    """
    def has_permission(self, request, view):
        # Разрешить все операции чтения (GET, HEAD или OPTIONS) всем
        if request.method in permissions.SAFE_METHODS:
            return True

        # Разрешить операции редактирования и удаления только персоналу
        return request.user.is_staff
