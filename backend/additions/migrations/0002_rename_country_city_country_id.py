# Generated by Django 4.2.4 on 2024-04-01 14:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('additions', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='city',
            old_name='country',
            new_name='country_id',
        ),
    ]
