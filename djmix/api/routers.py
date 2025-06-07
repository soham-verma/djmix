from rest_framework.routers import DefaultRouter
from tracks.views import TrackViewSet, CuePointViewSet, EffectPresetViewSet

router = DefaultRouter()
router.register(r'tracks', TrackViewSet)
router.register(r'cues', CuePointViewSet)
router.register(r'presets', EffectPresetViewSet)
