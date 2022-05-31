from rest_framework.generics import GenericAPIView
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User

from .serializers import MyTokenObtainPairSerializer
from .serializers import UserSerializer
# from .serializers import LogoutSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    # serializer_class = TokenObtainPairSerializer


class LogoutView(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            print(request.data)
            refresh = request.data['refresh']
            black_token = RefreshToken(refresh)
            black_token.blacklist()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except KeyError as ke:
            print(f'KeyError: {ke}')
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except TokenError as te:
            print(f'TokenError: {te}')
            return Response(status=status.HTTP_400_BAD_REQUEST)

# class LogoutView(GenericAPIView):
#     serializer_class = LogoutSerializer
#     # permission_classes = [permissions.IsAuthenticated]
#
#     def post(self, request, *args):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(status=status.HTTP_204_NO_CONTENT)



class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes = [permissions.IsAdminUser]