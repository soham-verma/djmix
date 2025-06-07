from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Track(models.Model):
    owner     = models.ForeignKey(User, on_delete=models.CASCADE)
    title     = models.CharField(max_length=200)
    file      = models.FileField(upload_to='tracks/')
    bpm       = models.FloatField()
    length    = models.DurationField()
    is_public = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

class CuePoint(models.Model):
    track    = models.ForeignKey(Track, related_name='cues', on_delete=models.CASCADE)
    time     = models.DurationField()
    label    = models.CharField(max_length=100)

class EffectPreset(models.Model):
    owner     = models.ForeignKey(User, on_delete=models.CASCADE)
    name      = models.CharField(max_length=100)
    settings  = models.JSONField()  # e.g. { "filter_freq": 1000, "delay": 0.3 }
