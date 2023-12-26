import React, {useState} from 'react';
import LevelOneIrregularVerb from "./levelOne/LevelOneIrregularVerb";

const score = {
  verbs: 0,
  right: 0,
  mistake: 0
}

const IrregularVerb = () => {

  const [totalScore, setTotalScore] = useState({...score});


  return (
      <div>
        <LevelOneIrregularVerb
          score={{...score}}
        />
      </div>
  );
};

export default IrregularVerb;