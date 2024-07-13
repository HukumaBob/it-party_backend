from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail
from .models import User
from random import sample
from django.db import OperationalError

@shared_task
def random_coffee():
    try:
        # Получаем всех пользователей, у которых
        # есть профиль и они не являются персоналом
        users = User.objects.filter(
            is_staff=False, userprofile__isnull=False
            )

        # Если пользователей меньше двух, то невозможно создать пару
        if users.count() < 2:
            print("Недостаточно пользователей для создания пары")
            return

        # Выбираем двух случайных пользователей
        user1, user2 = sample(list(users), 2)

        # Формируем и отправляем сообщения
        for user in [user1, user2]:
            name = user.first_name if user.first_name else (
                "пользователь сервиса random coffee!"
                )
            other_user_email = user2.email if user == user1 else user1.email
            message = (
                f"Здравствуйте, уважаемый {name}. "
                "Предлагаем вам встретиться за чашкой кофе онлайн "
                f"с вашим, вероятно, незнакомым коллегой ({other_user_email})."
            )
            send_mail(
                "Приглашение на кофе",
                message,
                settings.EMAIL_HOST_USER,
                [user.email],
            )
            print(f"Направлено письмо пользователю {user.email}")

    except OperationalError:
        print("Не удалось подключиться к базе данных. Пожалуйста, проверьте подключение.")
