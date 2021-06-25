import PlayBoard from '../components/PlayBoard/PlayBoard';
import ScoreHistory from '../components/ScoreHistory/ScoreHistory';
import styles from '../styles/Home.module.css';

function play() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <PlayBoard />
        <ScoreHistory />
      </div>
    </main>
  );
}

export default play;
