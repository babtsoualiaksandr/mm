

from ramup.models import RadioStation, RadioStationsByCity, Town
from rest_framework import serializers


class TownSerializer(serializers.ModelSerializer):
    class Meta:
        model = Town
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


   
