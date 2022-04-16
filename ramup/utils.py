from ramup.models import BenchmarkCityGenderAge, Telephone
import calendar
from datetime import datetime
import math
from django.core.serializers.json import DjangoJSONEncoder

from ramup.serializers import TelephoneSerializer


def quota_by_day_of_week(month_date='', monthly_quota=3750):
    if month_date == '':
        now = datetime.now()
    year = now.year
    month = now.month
    _, day_in_month = calendar.monthrange(year, month)
    quantity_per_day = monthly_quota / day_in_month
    c = calendar.Calendar()
    number_of_days_of_the_week = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    for number_day in c.itermonthdays2(year, month):
        number, day = number_day
        if number != 0:
            number_of_days_of_the_week[day] += 1
    amount_of_days_of_the_week = {}
    for item in number_of_days_of_the_week:
        amount_of_days_of_the_week[item] = (number_of_days_of_the_week[item], math.ceil(
            quantity_per_day*number_of_days_of_the_week[item]))
    return amount_of_days_of_the_week


def quota_by_day_of_now(now_date=''):
    if now_date == '':
        now = datetime.now()
    day_of_week = now.weekday()
    quota_of_days = quota_by_day_of_week()
    benchmarks = BenchmarkCityGenderAge.objects.prefetch_related("age", "city").all()
    q = float(quota_of_days[day_of_week][1]/100)
    quota_now = {}
    for benchmark in benchmarks:
        if not benchmark.city.name in quota_now.keys(): 
            quota_now[benchmark.city.name] = {}
        if not benchmark.age.group in quota_now[benchmark.city.name].keys():
            quota_now[benchmark.city.name][benchmark.age.group] = {}
        quota_now[(benchmark.city.name)][benchmark.age.group]['M'] = q * float(benchmark.population_M_rate)
        quota_now[(benchmark.city.name)][benchmark.age.group]['F'] = q * float(benchmark.population_F_rate)
    return quota_now


import random
from django.forms.models import model_to_dict
import json
from django.http import JsonResponse

def get_number_telephone(number_telephon=None):
    number_telephon = Telephone.objects.order_by('?').first()
    res = TelephoneSerializer(
        number_telephon, many=False)
    print(json.dumps(res.data, ensure_ascii=False))

    return res.data
