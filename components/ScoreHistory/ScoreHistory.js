import { useUser } from '../../Context/UserContext';
import styles from './ScoreHistory.module.css';

function ScoreHistory() {
  const user = useUser();

  return (
    <ul>
      {user.bestScoresHistory.sort(b - a).map((score, index) => {
        return <li key={index}>{score}</li>;
      })}
    </ul>
  );
}

export default ScoreHistory;
