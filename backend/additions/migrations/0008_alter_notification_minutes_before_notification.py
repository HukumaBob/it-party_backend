# Generated by Django 4.2.4 on 2024-04-15 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('additions', '0007_notification_minutes_before_notification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='minutes_before_notification',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name='Minutes before Notification'),
        ),
    ]
