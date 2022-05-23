from rest_framework import serializers
from .models import WeightTracker


class WeightTrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightTracker
        fields = ['user', 'current_weight','weight_goal','birthday','height']
        depth = 1