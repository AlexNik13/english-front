import React from 'react';
import styles from "./css/VerbAnswer.module.css";

const VerbAnswer = ({title, verb, transcription, right, mistake}) => {
  return (
      <div>
        <div className={styles.verb_answer__title}>
          {title}
        </div>
        <div
            className={
          `${styles.verb_answer} ${mistake && styles.verb_answer__verb__answer__mistake} ${right && styles.verb_answer__verb__answer__right}`
        }
        >
          <div>
            <div className={styles.verb_answer__verb}>{verb}</div>
            <div>{transcription}</div>
          </div>
        </div>
      </div>
  );
};

export default VerbAnswer;