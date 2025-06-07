from django.db import models
from django.contrib.auth import get_user_model
from tracks.models import Track

User = get_user_model()

class Playlist(models.Model):
    owner     = models.ForeignKey(User, on_delete=models.CASCADE)
    title     = models.CharField(max_length=200)
    tracks    = models.ManyToManyField(Track)
    created_at = models.DateTimeField(auto_now_add=True)
