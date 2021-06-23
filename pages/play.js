import PlayBoard from '../components/PlayBoard/PlayBoard';
import ScoreHistory from '../components/ScoreHistory/Scorehistory';
import styles from '../styles/Home.module.css';

function play() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ScoreHistory />
        <PlayBoard />
      </div>
    </main>
  );
}

export default play;
