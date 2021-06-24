import PlayBoard from '../components/PlayBoard/PlayBoard';
import ScoreHistory from '../components/ScoreHistory/ScoreHistory';
import styles from '../styles/Home.module.css';

function play() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.columnLayout}>
          <ScoreHistory />
          <PlayBoard />
        </div>
      </div>
    </main>
  );
}

export default play;
