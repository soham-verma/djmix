import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface DeckProps {
  url: string;
}

export function Deck({ url }: DeckProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer|null>(null);
  const [playing, setPlaying] = useState(false);
  const [tempo, setTempo] = useState(1.0);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#444',
        progressColor: '#888',
        backend: 'WebAudio',
      });
      wavesurfer.current.load(url);
    }
    return () => wavesurfer.current?.destroy();
  }, [url]);

  const togglePlay = () => {
    wavesurfer.current!.playPause();
    setPlaying(!playing);
  };

  const onTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    setTempo(value);
    wavesurfer.current!.setPlaybackRate(value);
  };

  return (
    <div className="deck">
      <div ref={waveformRef} className="waveform" />
      <button onClick={togglePlay}>{playing ? 'Pause' : 'Play'}</button>
      <label>
        Tempo: 
        <input
          type="range" min="0.5" max="2.0" step="0.01"
          value={tempo} onChange={onTempoChange}
        />
      </label>
    </div>
  );
}
