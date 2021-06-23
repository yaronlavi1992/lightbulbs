import { useRef, useEffect, useState } from 'react';
import styles from './Lightbulb.module.css';

function Lightbulb(props) {
  const [color, setColor] = useState('white');

  useEffect(() => {
    if (props.lit) {
      changeColor();
    }
  }, [props.lit]);

  function changeColor() {
    setColor(props.bgColor);
    setTimeout(() => {
      setColor('white');
    }, 400);
  }

  return (
    <div
      onClick={props.onClickCallback}
      className={styles.lightbulb}
      style={{ backgroundColor: color }}
    />
  );
}

export default Lightbulb;
