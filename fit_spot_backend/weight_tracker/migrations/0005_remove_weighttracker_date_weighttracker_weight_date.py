# Generated by Django 4.0.4 on 2022-05-27 04:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('weight_tracker', '0004_alter_weighttracker_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='weighttracker',
            name='date',
        ),
        migrations.AddField(
            model_name='weighttracker',
            name='weight_date',
            field=models.DateField(auto_now=True),
        ),
    ]