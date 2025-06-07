import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'

interface Props {
  url: string
}

export default function WaveformDisplay({ url }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const waveRef = useRef<WaveSurfer | null>(null)

  useEffect(() => {
    if (ref.current) {
      waveRef.current = WaveSurfer.create({
        container: ref.current,
        waveColor: '#888',
        progressColor: '#555',
        cursorWidth: 0,
        height: 80,
      })
      waveRef.current.load(url)
    }
    return () => waveRef.current?.destroy()
  }, [url])

  return <div ref={ref} />
}
