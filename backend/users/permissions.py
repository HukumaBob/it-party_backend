from rest_framework import permissions


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Разрешение, которое позволяет авторизованным пользователям создавать,
    редактировать, удалять и просматривать свой профиль. Администраторы
    могут просматривать и удалять профили всех пользователей, кроме
    других администраторов. Неавторизованные пользователи не имеют
    доступа к профилям.
    """
    def has_object_permission(self, request, view, obj):
        # Если пользователь является владельцем профиля
        if obj.user == request.user:
            return True
        # Если пользователь является администратором
        # и объект не является администратором
        elif request.user.is_staff and not obj.user.is_staff:
            return True
        # Во всех остальных случаях доступ запрещен
        return False

class IsSuperUser(permissions.BasePermission):
    """
    Разрешение, позволяющее суперпользователям создавать, обновлять, удалять и
    просматривать объекты. Все остальные не имеют доступа.
    """

    def has_permission(self, request, view):
        # Проверка на суперпользователя для всех запросов
        return request.user and request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        # Проверка на суперпользователя для операций с объектом
        return request.user and request.user.is_superuser