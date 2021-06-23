import Lightbulb from '../Lightbulb/Lightbulb';
import { useContext, useState, useEffect, useRef } from 'react';
import styles from './LightbulbsWrapper.module.css';
import { UserContext } from '../../Context/UserContext';

function LightbulbsWrapper(props) {
  const [user, setUser] = useContext(UserContext);
  const [sequence, setSequence] = useState([0]);
  const [userInput, setUserInput] = useState([]);
  const [colors, setColors] = useState([]);
  const [litBulb, setLitBulb] = useState(null);

  useEffect(() => {
    generateUniqueColors();
    playSequence();
    console.log(user.score);
  }, []);

  useEffect(() => {
    playSequence();
  }, [sequence]);

  useEffect(() => {
    if (userInput.length === sequence.length) {
      let correct = true;
      for (let i = 0; i < sequence.length; i++) {
        if (sequence[i] !== userInput[i]) {
          correct = false;
        }
      }
      if (correct) {
        setUser({ ...user, score: user.score + 10 });
        setUserInput([]);
        addToSequence();
      } else {
        setUser({ ...user, score: 0 });
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
    console.log(sequence);
    let currentSeq = [...sequence];
    let seqInt = setInterval(() => {
      if (currentSeq.length > 0) {
        setLitBulb(currentSeq.shift());
        setLitBulb(null); // reset lit to prevent matched prev bulb relit issue
      } else {
        clearInterval(seqInt);
      }
    }, 1000);
  }

  function generateUniqueColors() {
    let generatedColors = [];
    for (let i = 0; i < props.bulbsCount; i++) {
      generatedColors.push(
        '#' + ((Math.random() * 0xffffff) << 0).toString(16)
      );
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
          action={() => setUserInput([...userInput, i])}
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
