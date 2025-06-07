import Deck from '../Deck/Deck'
import MixerControls from './MixerControls'

export default function Mixer() {
  // Demo URLs would be replaced with real tracks
  return (
    <div className="mixer">
      <Deck id="A" url="/trackA.mp3" />
      <Deck id="B" url="/trackB.mp3" />
      <MixerControls />
    </div>
  )
}
