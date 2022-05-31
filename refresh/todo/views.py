from rest_framework import viewsets

from .models import Todo
from .serializers import TodoSerializer
from .permissions import IsOwnerUpdateOrReadOnly


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsOwnerUpdateOrReadOnly]  # 사용자정의 permission.

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)