import { useUser } from '../../Context/UserContext';
import styles from './ScoreHistory.module.css';

function ScoreHistory() {
  const user = useUser();

  return (
    <ul className={styles.ul}>
      {user.bestScoresHistory
        .sort((a, b) => b.score - a.score)
        .map((scoreObj, index) => {
          return (
            <li className={styles.li} key={index}>
              <div>Name: {scoreObj.name}</div>
              <div>
                <b>Score: {scoreObj.score}</b>
              </div>
              <div>Date: {scoreObj.date}</div>
              <div>Time: {scoreObj.time}</div>
              <br />
            </li>
          );
        })}
    </ul>
  );
}

export default ScoreHistory;
