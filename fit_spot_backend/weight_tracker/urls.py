from django.urls import path, include
from weight_tracker import views


urlpatterns = [
    path('addweight/', views.add_weight),
    path('userinfo/', views.get_user),
 ]