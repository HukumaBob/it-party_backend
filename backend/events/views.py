from django.core.files.storage import default_storage
from django.db import transaction
from rest_framework import viewsets, status, generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from userevents.models import UserEvent
from events.models import Event, EventGallery, RejectionReason, Speaker, FormTemplate
from additions.models import City
from events.filters import EventFilter, SpeakerFilter
from events.permissions import IsStaffOrReadOnly
from events.serializers import (
    AdminEventSerializer,
    AdminUserEventSerializer,
    EventGallerySerializer,
    EventSerializer,
    EventDetailSerializer,
    RejectionReasonSerializer,
    SpeakerDetailSerializer,
    SpeakerSerializer,
)


class EventViewSet(viewsets.ModelViewSet):
    """
    Главная страница эвентов, с возможностью просмотреть подробную информацию.
    """

    queryset = Event.objects.all().order_by("date")
    filterset_class = EventFilter
    permission_classes_by_action = {
        "create": [IsStaffOrReadOnly],
        "update": [IsStaffOrReadOnly],
        "partial_update": [IsStaffOrReadOnly],
        "destroy": [IsStaffOrReadOnly],
        "default": [AllowAny],
    }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [
                permission()
                for permission in self.permission_classes_by_action[self.action]
            ]
        except KeyError:
            # action is not set return default permission_classes
            return [
                permission()
                for permission in self.permission_classes_by_action["default"]
            ]

    def get_serializer_class(self):
        if self.action == "list":
            return EventSerializer
        return EventDetailSerializer

    #  Это позволяет нам получить текущего пользователя
    # в методе get_user_application_status нашего
    # сериализатора EventSerializer
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        # Получаем список идентификаторов спикеров, специализаций и админов
        speaker_ids = data.pop("speakers")
        specialization_ids = data.pop("specializations")
        event_admin_ids = data.pop("event_admin")

        # Получаем галерею изображений
        gallery_data = data.pop("gallery", [])

        # Создаем form_template
        form_template_data = data.pop("form_template")
        FormTemplate.objects.create(**form_template_data)

        # Получаем экземпляр City по его ID
        city_id = data.pop("city")
        city = City.objects.get(id=city_id)

        # Создаем событие и присваиваем ему город
        event = Event.objects.create(city=city, **data)

        # Создаем объекты EventGallery и добавляем их к событию
        gallery_objects = []
        for gallery_item in gallery_data:
            # Создаем объект EventGallery
            gallery_obj = EventGallery.objects.create(
                event_photo=gallery_item["event_photo"],
                caption=gallery_item.get("caption", "")
            )
            gallery_objects.append(gallery_obj)        

        # Связываем спикеров и специализации и организаторов с созданным событием
        event.speakers.set(speaker_ids)
        event.specializations.set(specialization_ids)
        event.event_admin.set(event_admin_ids)
        event.gallery.set(gallery_objects)

        return Response(
            EventDetailSerializer(event).data, status=status.HTTP_201_CREATED
        )
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()

        # Обновляем основные поля события
        speaker_ids = data.pop("speakers", None)
        specialization_ids = data.pop("specializations", None)
        event_admin_ids = data.pop("event_admin", None)
        gallery_data = data.pop("gallery", None)

        # Обновляем City, если передан новый ID
        city_id = data.pop("city", None)
        if city_id:
            city = City.objects.get(id=city_id)
            instance.city = city

        # Обновляем остальные поля объекта
        for attr, value in data.items():
            setattr(instance, attr, value)
        instance.save()

        # Обновляем спикеров, специализации и организаторов
        if speaker_ids is not None:
            instance.speakers.set(speaker_ids)
        if specialization_ids is not None:
            instance.specializations.set(specialization_ids)
        if event_admin_ids is not None:
            instance.event_admin.set(event_admin_ids)

        # Обновляем галерею, если данные предоставлены
        if gallery_data is not None:
            # Удаляем существующие объекты EventGallery, связанные с событием
            instance.gallery.clear()

            # Создаем новые объекты EventGallery и связываем их с событием
            gallery_objects = []
            for gallery_item in gallery_data:
                gallery_obj = EventGallery.objects.create(
                    event_photo=gallery_item["event_photo"],
                    caption=gallery_item.get("caption", "")
                )
                gallery_objects.append(gallery_obj)
            
            instance.gallery.set(gallery_objects)

        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @staticmethod
    def delete_related_files(instance):
        # Удаление файлов лого
        if instance.logo and default_storage.exists(instance.logo.path):
            default_storage.delete(instance.logo.path)

        # Удаление файлов галереи
        for gallery_item in instance.gallery.all():
            if gallery_item.event_photo and default_storage.exists(gallery_item.event_photo.path):
                default_storage.delete(gallery_item.event_photo.path)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        # Откатываем транзакцию в случае ошибки
        with transaction.atomic():
            # Удаляем связанные файлы
            self.delete_related_files(instance)

            # Удаляем связанные объекты галереи вручную
            instance.gallery.all().delete()

            # Удаляем объект события
            self.perform_destroy(instance)

        return Response(status=status.HTTP_204_NO_CONTENT)

class SpeakerViewSet(viewsets.ModelViewSet):
    """
    Главная страница эвентов, с возможностью просмотреть подробную информацию.
    """

    queryset = Speaker.objects.all().order_by("name")
    filterset_class = SpeakerFilter
    permission_classes_by_action = {
        "create": [IsStaffOrReadOnly],
        "put": [IsStaffOrReadOnly],
        "patch": [IsStaffOrReadOnly],
        "destroy": [IsStaffOrReadOnly],
        "default": [AllowAny],
    }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [
                permission()
                for permission in self.permission_classes_by_action[self.action]
            ]
        except KeyError:
            # action is not set return default permission_classes
            return [
                permission()
                for permission in self.permission_classes_by_action["default"]
            ]

    def get_serializer_class(self):
        if self.action == "list":
            return SpeakerSerializer
        return SpeakerDetailSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        # Получаем список идентификаторов специализаций
        specialization_ids = data.pop("specializations")

        # Создаем спикера
        speaker = Speaker.objects.create(**data)

        # Связываем специализации с созданным спикером
        speaker.specializations.set(specialization_ids)

        return Response(
            SpeakerDetailSerializer(speaker).data, status=status.HTTP_201_CREATED
        )

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = SpeakerDetailSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = SpeakerDetailSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminEventListView(generics.ListAPIView):
    queryset = Event.objects.all().order_by("date")
    serializer_class = AdminEventSerializer
    pagination_class = None

    def get_queryset(self):
        # Фильтрация по администратору
        user = self.request.user
        events = Event.objects.filter(event_admin=user)
        return events


class AdminUserEventView(generics.ListAPIView):
    serializer_class = AdminUserEventSerializer
    pagination_class = None

    def get_queryset(self):
        event_id = self.kwargs.get("event_id")  # Получаем ID ивента из URL
        user_events = UserEvent.objects.filter(event_id=event_id)
        return user_events


class RejectionReasonView(viewsets.ModelViewSet):
    queryset = RejectionReason.objects.all()
    serializer_class = RejectionReasonSerializer
    pagination_class = None


class EventGalleryViewSet(viewsets.ModelViewSet):
    queryset = EventGallery.objects.all()
    serializer_class = EventGallerySerializer
    permission_classes_by_action = {
        "create": [IsStaffOrReadOnly],
        "update": [IsStaffOrReadOnly],
        "partial_update": [IsStaffOrReadOnly],
        "destroy": [IsStaffOrReadOnly],
        "default": [AllowAny],
    }

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [
                permission()
                for permission in self.permission_classes_by_action[self.action]
            ]
        except KeyError:
            # action is not set return default permission_classes
            return [
                permission()
                for permission in self.permission_classes_by_action["default"]
            ]
