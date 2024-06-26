# Generated by Django 4.2.4 on 2024-04-14 06:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stack',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Stack Name')),
                ('stack_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.specialization', verbose_name='Stack ID')),
            ],
        ),
    ]
