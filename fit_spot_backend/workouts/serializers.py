from rest_framework import serializers
from .models import Workouts


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workouts
        fields = ['user','reps','exercise_id']
        depth = 1