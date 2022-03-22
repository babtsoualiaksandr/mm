import random
from django.http import HttpResponseRedirect, QueryDict
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse, reverse_lazy
from django.views.generic.edit import DeleteView

from ramup.models import Age, BenchmarkAgeGender, BenchmarkCityAge, BenchmarkCityGender, Document, Question, RadioStation, RadioStationsByCity, Telephone, Town
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.core.serializers import serialize
from django.http.response import JsonResponse

from .serializers import RadioStationsByCitySerializer, TownSerializer


from .forms import DocumentForm, SchedulerRequest
from django.contrib.auth.models import User, Group

from django.core import serializers
import json
from django.core.serializers.json import DjangoJSONEncoder

# Create your views here.


def home(request):
    return render(request, 'ramup/home.html', {
        'title': 'home'
    })


@login_required
@permission_required('ramup.view_document', raise_exception=True)
def upload_file(request):
    print(request)
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('/ramup/upload_file/')
    else:
        form = DocumentForm()
    return render(request, 'ramup/upload_file.html', {
        'form': form
    })


class DocumentDeleteView(PermissionRequiredMixin, DeleteView):
    model = Document
    success_url = reverse_lazy("upload_file")
    permission_required = ('ramup.view_document',
                           'ramup.change_document', 'ramup.delete_document')


def example(request):
    def fill(content):
        return f'{content*123}'

    flow = [
        {"name": "name one", "content": fill('content1'),
            "id": "content1", "idnext": "content2"},
        {"name": "name two", "content": fill('content2'),
         "id": "content2", "idnext": "content3"},
        {"name": "name thre", "content": fill('content3'),
         "id": "content3", "idnext": "content4"},
        {"name": "name four", "content": fill('content4'),
         "id": "content4", "idnext": "content1"},
    ]
    ids = [item['id'] for item in flow]
    towns = RadioStationsByCity.objects.all()
    ser_towns = RadioStationsByCitySerializer(towns, many=True)
    print(ser_towns)
    print('ddd', ser_towns.data)

    return render(request, 'ramup/example.html', {
        'flow': flow,
        'all_steps': ' '.join(ids),
        'ser_towns': ser_towns.data
    })


def questionnaire(request):
    if request.method == 'POST':
        print(request)
        print(dir(request))
        print((request.user))
        print((request.path))
        print(QueryDict(request.body.decode('utf-8')))
        print((request.content_params))

    questions = Question.objects.all()
    towns = Town.objects.all()
    radio_stations = RadioStationsByCity.objects.all()
    return render(request, 'ramup/questionnaire.html', {
        'questions': questions,
        'towns': towns,
        'radio_stations': radio_stations,
    })


def station_by_town(request, pk):
    data = list(RadioStationsByCity.objects.values())
    result = []
    res = {}
    for item in list(RadioStationsByCity.objects.filter(name_city_id=pk).values()):
        print(item)
        res["name_city"] = Town.objects.get(pk=item['name_city_id']).name
        res["name_radiostantion"] = RadioStation.objects.get(
            pk=item['radioStation_id']).name_rus
        res["frequency"] = item['frequency']
        result.append(res)
        res = {}
    res = RadioStationsByCitySerializer(
        RadioStationsByCity.objects.filter(name_city_id=pk), many=True)
    return JsonResponse(res.data, safe=False)


def get_cites(request):
    cites = Town.objects.all()
    res = TownSerializer(cites, many=True)
    return JsonResponse(res.data, safe=False)


def scheduler(request):
    # Telephone.objects.all().delete()
    # list_tel =[]
    # for i in range(1,100):
    #     age = Age.objects.get(pk=random.randint(1, 7))
    #     gender = random.randint(0, 1)
    #     town = Town.objects.get(pk=random.randint(1, 6))
    #     ph_no = []
    #     pref = [29,25,33,44]
    #     ph_no.append('+375')
    #     ph_no.append(random.choice(pref))
    #     for i in range(1, 8):
    #         ph_no.append(random.randint(0, 9))
    #     strNumber = ''.join([str(elem) for elem in ph_no])

    #     tel = Telephone(phone_number=strNumber, town=town,  gender=gender, age=age)
    #     tel.save()
    #     list_tel.append(tel)

    ages = Age.objects.all().values()
    cites = Town.objects.all().values()
    telephones = Telephone.objects.filter(pk=1134).values()
    genders = ['М', 'Ж']
    operators = User.objects.filter(groups__name='Operators').values()
    telephones_json = json.dumps(
        list(telephones), cls=DjangoJSONEncoder, ensure_ascii=False)
    cites_json = json.dumps(
        list(cites), cls=DjangoJSONEncoder, ensure_ascii=False)
    ages_json = json.dumps(
        list(ages), cls=DjangoJSONEncoder, ensure_ascii=False)
    genders_json = json.dumps(genders, ensure_ascii=False)
    operators_json = json.dumps(
        list(operators), cls=DjangoJSONEncoder, ensure_ascii=False)

    sheduler = {}
    city_list = set()
    json_cite = {}
    print(cites)
    if request.method == 'POST':
        data = QueryDict(request.body.decode('utf-8'))
        for key in data:
            key_parse = key.split('_', 1)
            city_list.add(key_parse[0])
        city_list.remove('date')
        city_list.remove('csrfmiddlewaretoken')
        list_cites = {}
        for city in city_list:
            list_confines = []
            for key in data:
                key_parse = key.split('_', 1)
                if city == key_parse[0]:
                    print(city, key_parse[0], key_parse, key, data[key])
                    list_confines.append({key_parse[1]: int(data[key])})
                list_cites[city] = list_confines
        sheduler[data["date_sheduler"]] = list_cites
    print(sheduler)

    for tel in telephones:
        print(tel, cites.get(pk=tel['town_id'])['name'])

    return render(request, 'ramup/scheduler.html',
                  {'ages': ages_json,
                   'title': "Планировщик",
                   'cites': cites_json,
                   'genders': genders_json,
                   'operators': operators_json,
                   'telephones': telephones_json,
                   'sheduler': sheduler
                   })


def benchmark(request):
    city_ages = BenchmarkCityAge.objects.all()
    age_genders = BenchmarkAgeGender.objects.all()
    city_genders = BenchmarkCityGender.objects.all()

    return render(request, 'ramup/benchmark.html',
                  {'city_ages': city_ages,
                   'title': "Benchmark",
                   'age_genders': age_genders,
                   'city_genders': city_genders,
                   })
