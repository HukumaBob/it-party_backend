# Generated by Django 4.2.4 on 2024-04-09 08:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('userevents', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfileSnapshot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('snapshot_data', models.JSONField()),
                ('user_event', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='userevents.userevent')),
            ],
        ),
    ]