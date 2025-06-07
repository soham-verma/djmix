import Mixer from '../components/Mixer/Mixer';
import { Deck } from '../components/Deck/Desk';
import styles from './Mix.module.css';

export default function Mix() {
  return (
    <div className={styles.container}>
      <div className={styles.decks}>
        <Deck url="/trackA.mp3" />
        <Deck url="/trackB.mp3" />
      </div>
      <Mixer />
    </div>
  );
}
