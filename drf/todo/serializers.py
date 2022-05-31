from rest_framework import serializers

from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    # source를 지정하지 않으면, 기본값으로 owner.id가 들어감
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Todo
        fields = ['id', 'title', 'memo', 'owner', 'created_at']