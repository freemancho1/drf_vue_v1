from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=999)
    memo = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name='todos', on_delete=models.CASCADE)

    class Meta:
        ordering = ['created_at']