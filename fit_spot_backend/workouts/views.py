from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from workouts.serializers import WorkoutSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Workouts
from authentication.models import User
# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_fav_workouts(request):
    user_info = Workouts.objects.filter(user_id=request.user)
    serializer = WorkoutSerializer(user_info, many = True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_exercise(request):
    serializer = WorkoutSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_exercise(request, pk):
      user_info = Workouts.objects.filter(user_id=request.user)
      user_exercise=user_info.filter(exercise_id=pk)
      user_exercise.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
      