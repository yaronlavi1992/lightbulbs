import Lightbulb from '../Lightbulb/Lightbulb';
import { useState, useEffect } from 'react';
import { useDispatchUser, useUser } from '../../Context/UserContext';
import styles from './LightbulbsWrapper.module.css';

function LightbulbsWrapper(props) {
  const user = useUser();
  const dispatch = useDispatchUser();
  const [sequence, setSequence] = useState([0]);
  const [userInput, setUserInput] = useState([]);
  const [colors, setColors] = useState([]);
  const [litBulb, setLitBulb] = useState(null);

  const handleIncreaseScore = () => {
    dispatch({
      type: 'INCREASE_SCORE',
    });
  };

  const handleResetScore = () => {
    dispatch({
      type: 'RESET_SCORE',
    });
  };

  const handleNewBestScore = () => {
    dispatch({
      type: 'NEW_BEST_SCORE',
      payload: {
        name: user.name,
        score: user.score,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      },
    });
  };

  useEffect(() => {
    generateUniqueColors();
    playSequence();
  }, []);

  useEffect(() => {
    playSequence();
  }, [sequence]);

  useEffect(() => {
    if (userInput.length > 0) {
      lightBulbByNumber(userInput[userInput.length - 1]);
    }
    if (userInput.length === sequence.length) {
      let correct = true;
      for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] !== userInput[i]) {
          correct = false;
        }
      }
      if (correct) {
        handleIncreaseScore();
        setUserInput([]);
        addToSequence();
      } else {
        if (
          user.score >
          Math.max(...user.bestScoresHistory.map((scoreObj) => scoreObj.score))
        ) {
          handleNewBestScore();
        }
        handleResetScore();
        setUserInput([]);
        setSequence([0]);
      }
    }
  }, [userInput]);

  function addToSequence() {
    const bulbNumber = Math.floor(Math.random() * props.bulbsCount);
    setSequence([...sequence, bulbNumber]);
  }

  function playSequence() {
    let currentSeq = [...sequence];
    let seqInt = setInterval(() => {
      if (currentSeq.length > 0) {
        lightBulbByNumber(currentSeq.shift());
      } else {
        clearInterval(seqInt);
      }
    }, 1000);
  }

  function lightBulbByNumber(bulbNumber) {
    setLitBulb(bulbNumber);
    setTimeout(() => {
      setLitBulb(null); // reset lit to prevent matched prev bulb relit issue
    }, 500);
  }

  function generateUniqueColors() {
    let generatedColors = [];
    for (let i = 0; i < props.bulbsCount; i++) {
      let color = '#';
      for (let j = 0; j < 6; j++) {
        color += Math.floor(Math.random() * 10);
      }
      generatedColors.push(color);
    }
    // prevent duplicate colors
    if ([...new Set(generatedColors)].length !== props.bulbsCount) {
      generateUniqueColors();
    }
    setColors(generatedColors);
  }

  function renderHandler() {
    let bulbsToRender = [];
    for (let i = 0; i < props.bulbsCount; i++) {
      bulbsToRender.push(
        <Lightbulb
          lit={i === litBulb}
          action={() => {
            lightBulbByNumber(i);
            setUserInput([...userInput, i]);
          }}
          key={i}
          bgColor={colors[i]}
        />
      );
    }
    return bulbsToRender;
  }

  return <div className={styles.wrapper}>{renderHandler()}</div>;
}

export default LightbulbsWrapper;
