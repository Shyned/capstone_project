from django.urls import path
from workouts import views

urlpatterns = [
    # see all UA  request
    path('userworks/', views.get_fav_workouts),
    # pk request
    path('addworkout/', views.add_exercise),
    # delete exercise
    path('removeworkout/<pk>/', views.delete_exercise),
    
]