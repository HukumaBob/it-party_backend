# Generated by Django 4.2.4 on 2024-04-04 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('additions', '0004_rename_family_status_familystatus_familystatus'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notification', models.CharField(max_length=255)),
            ],
        ),
    ]