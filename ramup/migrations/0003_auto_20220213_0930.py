# Generated by Django 3.2 on 2022-02-13 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ramup', '0002_age_answer_question_respondent_telephone_town'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='prompt',
            field=models.TextField(blank=True, verbose_name='Подсказка'),
        ),
        migrations.AlterField(
            model_name='question',
            name='prompt',
            field=models.TextField(blank=True, verbose_name='Подсказка'),
        ),
    ]