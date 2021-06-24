import LightbulbsWrapper from '../LightbulbsWrapper/LightbulbsWrapper';
import styles from './PlayBoard.module.css';
import { useDispatchUser, useUser } from '../../Context/UserContext';

function PlayBoard() {
  const user = useUser();
  const dispatch = useDispatchUser();

  return (
    <div className={styles.playground}>
      <h3>Player: {user.name}</h3>
      <h3>Score: {user.score}</h3>
      <h3>
        Best Score:{' '}
        {Math.max(...user.bestScoresHistory.map((scoreObj) => scoreObj.score))}
      </h3>
      <LightbulbsWrapper bulbsCount={6} />
    </div>
  );
}

export default PlayBoard;
