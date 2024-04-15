from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import timedelta

# Установите переменную окружения по умолчанию для настроек Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')

# Используйте строку 'django.conf:settings', чтобы Celery загрузил 
# любые пользовательские настройки из вашего файла settings.py
app.config_from_object('django.conf:settings', namespace='CELERY')

# Загрузите модули задач из всех зарегистрированных приложений Django
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'check-user-subscriptions-every-10-minutes': {
        'task': 'userevents.tasks.check_user_subscriptions',
        'schedule': timedelta(minutes=1),
    },
}

app.conf.timezone = 'UTC'
