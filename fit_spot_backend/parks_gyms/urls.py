from django.urls import path
from parks_gyms import views

urlpatterns = [
    # see all UA  request
    path('parksgym/<pk>/', views.get_by_id),
    # pk request
    path('rateplace/', views.rate_park_gyms),
    
    path('allpgratings/<pk>/', views.get_pg_ratings),
    
]