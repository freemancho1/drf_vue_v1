from rest_framework import permissions


class IsOwnerUpdateOrReadOnly(permissions.BasePermission):
    """
    사용자면 변경(UPDATE(PUT), DELETE)이 가능하고,
    다른 사용자는 GET, HEAD, OPTIONS만 가능.
    """

    def has_object_permission(self, request, view, obj):
        # SAFE_METHODS: GET, HEAD, OPTIONS
        print(request.method, '------------------------------------------')
        if request.method in permissions.SAFE_METHODS:
            return True

        # else: POST, PUT, DELETE
        return obj.owner == request.owner