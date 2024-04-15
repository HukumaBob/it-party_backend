from __future__ import absolute_import, unicode_literals
from celery import shared_task
import datetime


@shared_task
def say_hello():
    print("Привет! Текущее время: " + str(datetime.datetime.now()))
