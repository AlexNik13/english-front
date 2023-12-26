import React, {useEffect, useState} from 'react';
import axios from "../../../api/Axios";
import styles from './LevelOneIrregularVerb.module.css';
import VerbQuestion from "../component/VerbQuestion";
import VerbAnswer from "../component/VerbAnswer";

const LevelOneIrregularVerb = ({score}) => {

  const [irregularVerbs, setIrregularVerbs] = useState([]);
  const [irregularVerb, setIrregularVerb] = useState();

  const [indexQuestion, setIndexQuestion] = useState(0)
  const [question, setQuestion] = useState();

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const [totalPages, setTotalPages] = useState();

  const [answers, setAnswers] = useState([])

  useEffect(() => {
    console.log(irregularVerbs)
  }, [irregularVerbs])

  const handlerNext = () => {
    if (indexQuestion < irregularVerbs.length - 1) {
      console.log('indexQuestion < irregularVerbs.length -1')
      setIndexQuestion(index => index + 1);
      setIrregularVerb(irregularVerbs[indexQuestion]);
    }

    if (indexQuestion === irregularVerbs.length - 1 && pageNumber
        < totalPages) {
      console.log(
          'indexQuestion > irregularVerbs.length - 2 && pageNumber > totalPages')
      setPageNumber(pageNumber => pageNumber + 1);
      setIndexQuestion(index => index + 1)
      setIrregularVerb(irregularVerbs[indexQuestion]);
    }

    if (indexQuestion === irregularVerbs.length - 1 && pageNumber
        === totalPages) {
      console.log(indexQuestion === irregularVerbs.length - 1 && pageNumber
          === totalPages)
      setPageNumber(() => 0);
      setIrregularVerb(irregularVerbs[indexQuestion]);
    }
  }

  const handlerReset = () => {
    setAnswers([]);
    handlerIrregularVerbQuestion(irregularVerb);
  }

  const handlerGetAnswer = (indexQuestionVerb) => {
    const answer = question.verbs[indexQuestionVerb];

    setAnswers(answers => [...answers, answer])

    question.verbs.splice(indexQuestionVerb, 1);
    setQuestion(question => question)
  }

  const handlerIrregularVerbQuestion = (verb) => {
    if (!verb) {
      return;
    }
    let randomVerbs = getRandomVerbs(verb);
    const question = {
      title: verb.translateRu,
      verbs: randomVerbs
    };

    setQuestion(question);
  }

  function getRandomVerbs(verb) {
    const randomIndex = [];
    while (randomIndex.length < 3) {
      const randomNum = Math.floor(Math.random() * 3);
      if (!randomIndex.includes(randomNum)) {
        randomIndex.push(randomNum);
      }
    }

    const verbs = [verb.infinitive, verb.past, verb.pastParticiple]
    const verbTranscriptions = [verb.infinitiveTranscription,
      verb.pastTranscription, verb.pastParticipleTranscription]

    return [
      {
        verb: verbs[randomIndex[0]],
        transcription: verbTranscriptions[randomIndex[0]]
      }, {
        verb: verbs[randomIndex[1]],
        transcription: verbTranscriptions[randomIndex[1]]
      }, {
        verb: verbs[randomIndex[2]],
        transcription: verbTranscriptions[randomIndex[2]]
      }
    ]
  }

  useEffect(() => {
    handlerIrregularVerbQuestion(irregularVerb);
    handlerReset();
  }, [irregularVerb])

  useEffect(() => {
    const getIrregularVerb = async () => {
      try {
        const data = await axios.get(
            '/irregular-verbs', {
              params: {
                page: pageNumber,
                size: pageSize
              }
            }
        ).then(value => value.data);

        setTotalPages(data?.totalPages)
        if (!data?.empty) {
          const content = data?.content;

          setIrregularVerbs([...irregularVerbs, ...content])

          if (!irregularVerb) {
            setIrregularVerb(content[0])
          }
        }

      } catch (e) {
        console.log(e)
      }
    }
    getIrregularVerb();
  }, [pageNumber])

  if (!irregularVerbs) {
    return <div>Loading</div>
  }

  return (
      <div className={styles.level_one_irregular_verb__container}>
        <div
            className={styles.level_one_irregular_verb__title}>
          {irregularVerb?.translateRu}
        </div>

        <div className={styles.level_one_irregular_verb__three_forms}>

          <VerbAnswer
              right={answers.length === 3 && answers[0].verb
                  === irregularVerb.infinitive}
              mistake={answers.length === 3 && answers[0].verb
                  !== irregularVerb.infinitive}
              title={'Infinitive'}
              verb={answers[0]?.verb}
              transcription={answers[0]?.transcription}
          />

          <VerbAnswer
              right={answers.length === 3 && answers[1].verb
                  === irregularVerb.past}
              mistake={answers.length === 3 && answers[1].verb
                  !== irregularVerb.past}
              title={'Past'}
              verb={answers[1]?.verb}
              transcription={answers[1]?.transcription}
          />

          <VerbAnswer
              right={answers.length === 3 && answers[2].verb
                  === irregularVerb.pastParticiple}
              mistake={answers.length === 3 && answers[2].verb
                  !== irregularVerb.pastParticiple}
              title={'Past participle'}
              verb={answers[2]?.verb}
              transcription={answers[2]?.transcription}
          />

        </div>

        <div className={styles.level_one_irregular_verb__three_forms__question}>
          {
              question &&
              <>
                {
                  question.verbs.map((verb, i) =>
                      <VerbQuestion
                          key={i}
                          verb={verb.verb}
                          transcription={verb.transcription}
                          indexVerb={i}
                          onclick={handlerGetAnswer}
                      />
                  )
                }

              </>
          }
        </div>

        <div className={styles.level_one_irregular_verb__buttons}>
          <button
              className={styles.level_one_irregular_verb__btn}
              onClick={handlerReset}
          >reset
          </button>
          <button
              className={styles.level_one_irregular_verb__btn}
              onClick={handlerNext}
          >next
          </button>
        </div>
      </div>
  );
};

export default LevelOneIrregularVerb;