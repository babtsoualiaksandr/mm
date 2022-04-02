from django.urls import path

from .views import DocumentDeleteView, benchmark, get_phone_number, home, operator_work, scheduler, upload_file, example, questionnaire, station_by_town, get_cites

urlpatterns = [
    path('', home, name='home'),    
    path('upload_file/', upload_file, name='upload_file'), 
    path('upload_file/<pk>/delete/', DocumentDeleteView.as_view(), name='upload_file_delete'),
    path('questionnaire/', operator_work, name='questionnaire'),
    path('example/', example, name='example'),
    path('station_by_town/<pk>/', station_by_town),
    path('cites/', get_cites),
    path('scheduler/', scheduler, name='scheduler'),
    path('benchmark/', benchmark, name='benchmark'),
    path('operator/', operator_work, name='operator'),
    path('get_phone_number/', get_phone_number, name='get_phone_number'),

       
]