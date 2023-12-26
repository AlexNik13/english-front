import React from 'react';
import styles from './css/VerbQuestion.module.css';

const VerbQuestion = ({verb, transcription, indexVerb, onclick}) => {

  return (
      <div className={`${styles.verb_question__container}`}
        onClick={() => onclick(indexVerb)}
      >
        <div>
          <div className={styles.verb_question__verb}>
            {verb}
          </div>
          <div>
            {transcription}
          </div>
        </div>
      </div>
  );
};

export default VerbQuestion;