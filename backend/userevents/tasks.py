from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail
from django.utils import timezone

from .models import UserEvent
from django.db import OperationalError

@shared_task
def check_user_subscriptions():
    try:
        # Получите все подписки, где время
        # уведомления меньше текущего времени
        user_events = UserEvent.objects.filter(
            application_status='approved',
            # только одобренные заявки
            data_of_notification__lt=timezone.now(),
            # время уведомления меньше текущего времени
            data_of_notification__isnull=False
            # исключить пустые или None data_of_notification
            )

        for user_event in user_events:
            # Сформируйте сообщение
            message = (
                "Здравствуйте! Напоминаем вам, что "
                f"{user_event.event.data} в "
                f"{user_event.event.address} состоится "
                f"{user_event.event.name}. "
                "С уважением - организационный комитет")

            # Отправьте сообщение пользователю
            send_mail(
                "Напоминание о событии",
                message,
                settings.EMAIL_HOST_USER,
                [user_event.user_profile.user.email],
            )

            # Установите data_of_notification в 0
            user_event.data_of_notification = None
            user_event.save()

    except OperationalError:
        print(
            "Не удалось подключиться к базе данных. "
            "Пожалуйста, проверьте подключение."
            )

