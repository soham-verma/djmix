interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function MixerControls({ value, onChange }: Props) {
  return (
    <div>
      <label>
        Crossfader
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
        />
      </label>
    </div>
  );
}
