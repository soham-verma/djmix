import WaveformDisplay from '../WaveformDisplay/WaveformDisplay'
import { useDeck } from './useDeck'
import type { DeckId } from '../../context/store'

interface DeckProps {
  id: DeckId
  url: string
}

export default function Deck({ id, url }: DeckProps) {
  const { toggle, tempo, setTempo, playing } = useDeck(id, url)

  return (
    <div className="deck">
      <WaveformDisplay url={url} />
      <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
      <label>
        Tempo
        <input
          type="range"
          min={0.5}
          max={2}
          step={0.01}
          value={tempo}
          onChange={(e) => setTempo(parseFloat(e.target.value))}
        />
      </label>
    </div>
  )
}
