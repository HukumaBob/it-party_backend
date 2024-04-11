# Generated by Django 4.2.4 on 2024-04-08 17:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('additions', '0005_notification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='city',
            name='country_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='additions.country', verbose_name='Country ID'),
        ),
        migrations.AlterField(
            model_name='city',
            name='name',
            field=models.CharField(max_length=255, verbose_name='City Name'),
        ),
        migrations.AlterField(
            model_name='country',
            name='index',
            field=models.IntegerField(verbose_name='Index'),
        ),
        migrations.AlterField(
            model_name='country',
            name='name',
            field=models.CharField(max_length=255, verbose_name='Country Name'),
        ),
        migrations.AlterField(
            model_name='education',
            name='education',
            field=models.CharField(max_length=255, verbose_name='Education'),
        ),
        migrations.AlterField(
            model_name='familystatus',
            name='familystatus',
            field=models.CharField(max_length=255, verbose_name='Family Status'),
        ),
        migrations.AlterField(
            model_name='income',
            name='income',
            field=models.CharField(max_length=255, verbose_name='Income'),
        ),
        migrations.AlterField(
            model_name='notification',
            name='notification',
            field=models.CharField(max_length=255, verbose_name='Notification'),
        ),
    ]