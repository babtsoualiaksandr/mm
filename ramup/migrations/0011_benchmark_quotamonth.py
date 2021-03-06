# Generated by Django 3.2 on 2022-03-11 08:53

from decimal import Decimal
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ramup', '0010_crashedtelephone'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuotaMonth',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gender', models.IntegerField(choices=[(0, 'Male'), (1, 'Female')])),
                ('quota', models.IntegerField()),
                ('month_year', models.DateField(auto_now_add=True)),
                ('age', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='QuotaMonths', to='ramup.age')),
                ('city', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='QuotaMonths', to='ramup.town')),
            ],
        ),
        migrations.CreateModel(
            name='Benchmark',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('population', models.DecimalField(decimal_places=2, max_digits=6, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))])),
                ('age', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='benchmarks', to='ramup.age')),
                ('city', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='benchmarks', to='ramup.town')),
            ],
        ),
    ]
