# Generated by Django 4.2.4 on 2024-04-16 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0007_event_offline'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='record_link',
            field=models.URLField(blank=True, null=True),
        ),
    ]
