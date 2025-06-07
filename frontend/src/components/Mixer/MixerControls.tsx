import { ChangeEvent } from 'react'
import { useStore } from '../../context/store'

export default function MixerControls() {
  const crossfader = useStore(s => s.crossfader)
  const setCrossfader = useStore(s => s.setCrossfader)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCrossfader(parseFloat(e.target.value))
  }

  return (
    <div className="mixer-controls">
      <label>
        Crossfader
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={crossfader}
          onChange={onChange}
        />
      </label>
    </div>
  )
}
