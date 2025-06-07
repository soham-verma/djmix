import { useEffect, useRef } from 'react'
import { DeckId, useStore } from '../../context/store'

export function useDeck(id: DeckId, url: string) {
  const audioCtx = useStore(s => s.audioCtx)
  const gain = useStore(s => s.getGain(id))
  const tempo = useStore(s => s.decks[id].tempo)
  const playing = useStore(s => s.decks[id].playing)
  const position = useStore(s => s.decks[id].position)
  const setTempo = useStore(s => s.setTempo)
  const setPlaying = useStore(s => s.setPlaying)
  const setPosition = useStore(s => s.setPosition)

  const bufferRef = useRef<AudioBuffer | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    fetch(url)
      .then(r => r.arrayBuffer())
      .then(ab => audioCtx.decodeAudioData(ab))
      .then(buf => {
        bufferRef.current = buf
      })
  }, [url, audioCtx])

  const play = () => {
    if (!bufferRef.current) return
    const src = audioCtx.createBufferSource()
    src.buffer = bufferRef.current
    src.playbackRate.value = tempo
    src.connect(gain)
    startTimeRef.current = audioCtx.currentTime - position
    src.start(0, position)
    src.onended = () => {
      setPlaying(id, false)
      setPosition(id, 0)
    }
    sourceRef.current = src
    setPlaying(id, true)
  }

  const pause = () => {
    if (sourceRef.current) {
      sourceRef.current.stop()
      const pos = audioCtx.currentTime - startTimeRef.current
      setPosition(id, pos)
    }
    setPlaying(id, false)
  }

  const toggle = () => {
    playing ? pause() : play()
  }

  useEffect(() => {
    if (sourceRef.current) {
      sourceRef.current.playbackRate.value = tempo
    }
  }, [tempo])

  return {
    play,
    pause,
    toggle,
    position,
    tempo,
    setTempo: (t: number) => setTempo(id, t),
    playing,
  }
}
