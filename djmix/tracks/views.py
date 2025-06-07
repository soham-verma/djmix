from rest_framework import viewsets, permissions
from .models import Track, CuePoint, EffectPreset
from .serializers import TrackSerializer, CuePointSerializer, EffectPresetSerializer

class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        track = serializer.save(owner=self.request.user)
        from .tasks import transcode_track
        transcode_track.delay(track.id)
class CuePointViewSet(viewsets.ModelViewSet):
    queryset = CuePoint.objects.all()
    serializer_class = CuePointSerializer

class EffectPresetViewSet(viewsets.ModelViewSet):
    queryset = EffectPreset.objects.all()
    serializer_class = EffectPresetSerializer
