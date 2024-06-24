from django.db import models
from django.utils.translation import gettext_lazy as _
from users.models import UserProfile
from events.models import Event


class UserEvent(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    APPLICATION_STATUS_CHOICES = [
        ('none', _('Не подана')),
        ('pending', _('На рассмотрении')),
        ('approved', _('Одобрена')),
        ('rejected', _('Отклонена')),
    ]
    application_status = models.CharField(
        max_length=20,
        choices=APPLICATION_STATUS_CHOICES,
        default='none',
    )
    data_of_notification = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name=_("Время уведомления"),
    )

    class Meta:
        unique_together = ("user_profile", "event")


class UserProfileSnapshot(models.Model):
    user_event = models.OneToOneField(UserEvent, on_delete=models.CASCADE)
    snapshot_data = models.JSONField()

