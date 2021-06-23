import Lightbulb from '../Lightbulb/Lightbulb';
import { useContext, useState, useEffect, useRef } from 'react';
import styles from './LightbulbsWrapper.module.css';
import { UserContext } from '../../pages';

function LightbulbsWrapper(props) {
  const user = useContext(UserContext);
  const [sequence, setSequence] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [colors, setColors] = useState([]);
  const [litBulb, setLitBulb] = useState(null);

  useEffect(() => {
    generateUniqueColors();
    addToSequence();
    playSequence();
  }, []);

  useEffect(() => {
    playSequence();
  }, [sequence]);

  function onClickCallbackHandler(bulbIndex) {
    setClickCount(clickCount + 1);
    if (bulbIndex === litBulb) {
      user.score += 10;
      if (user.bestScore < user.score) {
        user.bestScore = user.score;
      }
    }
    if (clickCount === sequence.length) {
      addToSequence();
    }
  }

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
          onClickCallback={() => onClickCallbackHandler(i)}
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
