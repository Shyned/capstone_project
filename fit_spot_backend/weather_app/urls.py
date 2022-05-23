from django.urls import path
from weather_app import views

urlpatterns = [
    # see all UA  request
    path('location/', views.get_location),
    # pk request
    path('addarea/', views.add_location),
    
]
