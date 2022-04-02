

from ramup.models import Age, RadioStation, RadioStationsByCity, Telephone, Town
from rest_framework import serializers
from django.contrib.auth.models import User


class TownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Town
        fields = ['id','name']
class AgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Age
        depth = 1
        fields = '__all__'

class RadioStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RadioStation
        fields = '__all__'

class RadioStationsByCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = RadioStationsByCity
        depth = 1
        fields = '__all__' 
class TelephoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = Telephone
        depth = 2
        fields = '__all__' 

class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__' 


   
