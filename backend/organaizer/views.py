from django.conf import settings
from django.core.mail import EmailMessage, send_mail
from rest_framework import viewsets
from pathlib import Path
from rest_framework.response import Response
from userevents.models import UserEvent
from .models import Organizator
from userevents.models import UserProfileSnapshot
from .permissions import IsStaff
from .serializers import (
    OrganizatorSerializer,
    UserEventApplicationStatusSerializer
    )
from .utils import questionnaire_in_qr_code


email_host_user = settings.EMAIL_HOST_USER


class UserEventApplicationStatusViewSet(viewsets.GenericViewSet):
    """Представление для работы организатора с заявками пользователей"""
    queryset = UserEvent.objects.all()
    serializer_class = UserEventApplicationStatusSerializer
    permission_classes = [IsStaff]

    def partial_update(self, request, *args, **kwargs):
        """Обновление статуса заявки"""
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True
            )
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # Если 'prefetch_related' был применен,
            # то нужно обновить кэш prefetch.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
    
    def perform_update(self, serializer):
        """Сохранение обновленного статуса заявки"""
        instance = serializer.save()

        # Отправка письма пользователю
        subject = 'Статус вашей заявки'
        if instance.application_status == 'approved':
            message = 'Ваша заявка одобрена.\n\n'
            snapshot = UserProfileSnapshot.objects.get(user_event=instance)
            questionnaire = snapshot.snapshot_data
            questionnaire['application_number'] = instance.id
            img_filename = questionnaire_in_qr_code(questionnaire)
            message += 'QR-код с вашим билетом прикреплены к письму.'
            email = EmailMessage(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                [instance.user_profile.user.email],
            )
            media_root = Path(settings.MEDIA_ROOT)
            img_path = media_root / 'tickets' / img_filename
            email.attach_file(str(img_path))
            email.send()
        elif instance.application_status == 'rejected':
            message = 'Ваша заявка отклонена.'
            send_mail(
                subject, message, settings.EMAIL_HOST_USER,
                [instance.user_profile.user.email]
                )
        else:
            message = 'Статус вашей заявки был изменен.'
            send_mail(
                subject, message, settings.EMAIL_HOST_USER,
                [instance.user_profile.user.email]
                )


class OrganizatorViewSet(viewsets.ModelViewSet):
    """Представление для работы организатора"""
    queryset = Organizator.objects.all()
    serializer_class = OrganizatorSerializer
    permission_classes = [IsStaff]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
