from rest_framework import serializers
from .models import WeightTracker


class WeightTrackerSerializer(serializers.Model):
    class Meta:
        model = WeightTracker
        fields = [user, current_weight,weight_goal,bmi]
        depth = 1