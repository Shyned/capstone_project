from rest_framework import serializers
from .models import ParksGyms

class ParksGymsSerializer(serializers.odelSerializer):
    class Meta:
        model = ParksGyms
        fields = ['gym_park_id', 'rating','comment']
        depth = 1