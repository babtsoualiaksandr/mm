# Generated by Django 3.2 on 2022-02-15 03:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ramup', '0004_question_answers_json'),
    ]

    operations = [
        migrations.CreateModel(
            name='RadioStation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50)),
                ('name_rus', models.CharField(blank=True, max_length=50)),
            ],
        ),
        migrations.AlterField(
            model_name='question',
            name='answers_json',
            field=models.JSONField(default={'answer': 'first'}, verbose_name='answers'),
        ),
        migrations.CreateModel(
            name='RadioStationsByCity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('frequency', models.DecimalField(decimal_places=1, max_digits=3, verbose_name='')),
                ('name_city', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='RadioStationsByCites', to='ramup.town', verbose_name='Город')),
            ],
        ),
    ]