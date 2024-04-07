from django.db import models
from users.models import User
from events.models import Event


class Organizator(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
