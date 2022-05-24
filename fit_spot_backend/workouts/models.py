from django.db import models
from authentication.models import User
# Create your models here.

class Workouts(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reps = models.IntegerField()
    exercise_id  = models.CharField(max_length=100)