from django.db import models
from authentication.models import User

# Create your models here.
class ParksGyms(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    gym_park_id = models.CharField( max_length=50)
    rating = models.IntegerField()
    comment = models.CharField( max_length=50)