from django.db import models
from users.models import User
from events.models import Event, Speaker


class Organizator(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    speaker = models.ManyToManyField(Speaker)

    class Meta:
        unique_together = ('user', 'event')
