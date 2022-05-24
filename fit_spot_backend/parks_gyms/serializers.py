from rest_framework import serializers
from .models import ParksGyms

class ParksGymsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParksGyms
        fields = ['user','gym_park_id', 'rating','comment']
        depth = 1