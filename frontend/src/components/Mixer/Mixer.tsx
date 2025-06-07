import { useState } from 'react';
import MixerControls from './MixerControls';
import styles from './Mixer.module.css';

type MixerProps = {
  onCrossfadeChange?: (value: number) => void;
};

export default function Mixer({ onCrossfadeChange }: MixerProps) {
  const [crossfade, setCrossfade] = useState(0.5);

  const handleChange = (v: number) => {
    setCrossfade(v);
    onCrossfadeChange?.(v);
  };

  return (
    <div className={styles.mixer}>
      <MixerControls value={crossfade} onChange={handleChange} />
    </div>
  );
}
