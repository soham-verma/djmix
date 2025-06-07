export function useMIDI(onMessage: (msg: WebMidi.MIDIMessageEvent) => void) {
  useEffect(() => {
    navigator.requestMIDIAccess().then(midi => {
      for (let input of midi.inputs.values()) {
        input.onmidimessage = onMessage;
      }
    });
  }, [onMessage]);
}
