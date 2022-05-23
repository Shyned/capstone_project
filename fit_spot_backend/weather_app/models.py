from django.db import models
from authentication.models import User

# Create your models here.

class Location(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    city = models.CharField( max_length=50)
    state = models.CharField( max_length=50)
    zip_code = models.CharField( max_length=5)
    depth = 1