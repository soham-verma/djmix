import subprocess
from celery import shared_task
from .models import Track



@shared_task
def transcode_track(track_id):
    track = Track.objects.get(pk=track_id)
    in_path, out_path = track.file.path, in_path.replace('.wav','.mp3')
    subprocess.run(['ffmpeg','-i',in_path,'-codec:a','libmp3lame',out_path])
    # update track, save new file reference...
