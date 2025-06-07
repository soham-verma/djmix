from rest_framework import serializers
from .models import Track, CuePoint, EffectPreset

class CuePointSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuePoint
        fields = '__all__'

class TrackSerializer(serializers.ModelSerializer):
    cues = CuePointSerializer(many=True, read_only=True)
    class Meta:
        model = Track
        fields = '__all__'

class EffectPresetSerializer(serializers.ModelSerializer):
    class Meta:
        model = EffectPreset
        fields = '__all__'
