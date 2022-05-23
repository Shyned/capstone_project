from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from weather_app.serializer import LocationSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Location
from .serializer import LocationSerializer



# Create your views here.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_location(request):
    location = Location.objects.filter(user_id=request.user)
    serializer = LocationSerializer(location,many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_location(request):
    if request.method == "POST":
        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)