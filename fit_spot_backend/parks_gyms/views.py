from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from parks_gyms.serializers import ParksGymsSerializer
from rest_framework import status
from authentication.models import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import ParksGyms

# Create your views here

@api_view(['GET','DELETE'])
@permission_classes([IsAuthenticated])
def get_by_id(request, pk):
    parks_gyms = ParksGyms.objects.filter(gym_park_id = pk)
    if request.method == "GET":
        user_pgs=parks_gyms.filter(user_id=request.user)
        serializer = ParksGymsSerializer(user_pgs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method  == "DELETE":
        user_pgs = parks_gyms.filter(user_id=request.user)
        user_pgs.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def rate_park_gyms(request):
    if request.method == "POST":
        serializer = ParksGymsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pg_ratings(request,pk):
    parks_gyms = ParksGyms.objects.filter(gym_park_id = pk)
    serializer = ParksGymsSerializer(parks_gyms, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)