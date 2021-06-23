import LightbulbsWrapper from '../LightbulbsWrapper/LightbulbsWrapper';
import styles from './PlayBoard.module.css';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';

function PlayBoard() {
  const [user, setUser] = useContext(UserContext);

  return (
    <div className={styles.playground}>
      <h3>Player: {user.name}</h3>
      <h3>Score: {user.score}</h3>
      <h3>Best Score: {user.bestScore}</h3>
      <LightbulbsWrapper bulbsCount={6} />
    </div>
  );
}

export default PlayBoard;
