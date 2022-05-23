from authentication.models import User
from django.db import models

# Create your models here.
class WeightTracker(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    current_weight = models.IntegerField()
    weight_goal = models.IntegerField()
    birthday = models.DateField( auto_now=False, auto_now_add=False)
    height = models.IntegerField()
    