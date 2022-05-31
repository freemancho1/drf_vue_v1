from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User

from todo.models import Todo


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = User.objects\
                           .filter(username=self.user.username)\
                           .values('id', 'username', 'email', 'first_name', 'last_name',
                                   'is_staff', 'is_active')[0]
        print(data)
        return data


# class LogoutSerializer(serializers.Serializer):
#     refresh = serializers.CharField()
#
#     default_error_messages = {
#         'bad_token': 'This token is invalid or expired',
#     }
#
#     def validate(self, attrs):
#         print(attrs)
#         self.token = attrs['refresh']
#         return attrs
#
#     def save(self, **kwargs):
#         try:
#             RefreshToken(self.token).blacklist()
#         except TokenError:
#             self.fail('bad_token')


class UserSerializer(serializers.ModelSerializer):
    todos = serializers.PrimaryKeyRelatedField(many=True, queryset=Todo.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'todos']