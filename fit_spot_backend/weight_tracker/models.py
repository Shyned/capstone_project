from authentication.models import User
from django.db import models

# Create your models here.
class WeightTracker(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    current_weight = models.CharField(max_length=50)
    height = models.CharField(max_length=50)
    weight_goal = models.CharField(max_length=50)
    bmi = models.IntegerField()