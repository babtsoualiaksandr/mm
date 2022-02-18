from django.urls import path

from .views import DocumentDeleteView, home, upload_file, example, questionnaire, station_by_town

urlpatterns = [
    path('', home, name='home'),    
    path('upload_file/', upload_file, name='upload_file'), 
    path('upload_file/<pk>/delete/', DocumentDeleteView.as_view(), name='upload_file_delete'),
    path('questionnaire/', questionnaire, name='questionnaire'),
    path('example/', example, name='example'),
    path('station_by_town/<pk>/', station_by_town),

       
]