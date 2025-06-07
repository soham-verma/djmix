import { create } from 'zustand'

export type DeckId = 'A' | 'B'

interface DeckState {
  playing: boolean
  tempo: number
  position: number
  gain: GainNode
}

interface StoreState {
  audioCtx: AudioContext
  crossfader: number
  decks: Record<DeckId, DeckState>
  setCrossfader(value: number): void
  setTempo(id: DeckId, tempo: number): void
  setPlaying(id: DeckId, playing: boolean): void
  setPosition(id: DeckId, pos: number): void
  getGain(id: DeckId): GainNode
}

export const useStore = create<StoreState>((set) => {
  const audioCtx = new AudioContext()
  const gains = {
    A: audioCtx.createGain(),
    B: audioCtx.createGain(),
  }
  gains.A.connect(audioCtx.destination)
  gains.B.connect(audioCtx.destination)

  return {
    audioCtx,
    crossfader: 0.5,
    decks: {
      A: { playing: false, tempo: 1, position: 0, gain: gains.A },
      B: { playing: false, tempo: 1, position: 0, gain: gains.B },
    },
    setCrossfader(value) {
      gains.A.gain.value = 1 - value
      gains.B.gain.value = value
      set({ crossfader: value })
    },
    setTempo(id, tempo) {
      set(state => ({
        decks: { ...state.decks, [id]: { ...state.decks[id], tempo } },
      }))
    },
    setPlaying(id, playing) {
      set(state => ({
        decks: { ...state.decks, [id]: { ...state.decks[id], playing } },
      }))
    },
    setPosition(id, pos) {
      set(state => ({
        decks: { ...state.decks, [id]: { ...state.decks[id], position: pos } },
      }))
    },
    getGain(id) {
      return gains[id]
    },
  }
})
