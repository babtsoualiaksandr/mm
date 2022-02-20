from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse, reverse_lazy
from django.views.generic.edit import DeleteView

from ramup.models import Document, Question, RadioStation, RadioStationsByCity, Town
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.core.serializers import serialize
from django.http.response import JsonResponse

from .serializers import RadioStationsByCitySerializer, TownSerializer


from .forms import DocumentForm

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
    print('ddd',ser_towns.data)
    

    return render(request, 'ramup/example.html', {
        'flow': flow,
        'all_steps': ' '.join(ids),
        'ser_towns': ser_towns.data
    })


def questionnaire(request):
    questions = Question.objects.all()
    towns = Town.objects.all()
    radio_stations = RadioStationsByCity.objects.all()


    return render(request, 'ramup/questionnaire.html', {
        'questions': questions,
        'towns': towns
        
    })


def station_by_town(request, pk):
    # print(request)
    # radio_stations = RadioStationsByCity.objects.all()
    # json_data = serialize(
    #     "json", radio_stations, fields=('name_city', 'radioStation__name_rus', 'frequency'))
    # print(json_data)
    data=list(RadioStationsByCity.objects.values())
    result =[]
    res={}
    for item in list(RadioStationsByCity.objects.filter(name_city_id=pk).values()):
        print(item)
        res["name_city"]=Town.objects.get(pk=item['name_city_id']).name
        res["name_radiostantion"]=RadioStation.objects.get(pk=item['radioStation_id']).name_rus
        res["frequency"]=item['frequency']
        result.append(res)
        res={}
    print(result)

    res = RadioStationsByCitySerializer(RadioStationsByCity.objects.filter(name_city_id=pk), many=True)
    print(repr(res))
    print(res.data)

    return JsonResponse(res.data,safe = False)

def get_cites(request):
    cites = Town.objects.all()
    res = TownSerializer(cites, many=True)
    print(res.data)
    return JsonResponse(res.data,safe = False)


    
