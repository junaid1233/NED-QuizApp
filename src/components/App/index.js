import React, { useState } from 'react';

import Layout from '../Layout';
import Loader from '../Loader';
import Main from '../Main';
import Quiz from '../Quiz';
import Result from '../Result';
import { CATEGORIES } from '../../constants';

import { shuffle } from '../../utils';
import { withShuffledOptions } from '../../services/questionService';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [data, setData] = useState(null);
  const [countdownTime, setCountdownTime] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('0');
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [resultData, setResultData] = useState(null);

  const startQuiz = (quizData, timerSeconds, subject = '0') => {
    setLoading(true);
    setLoadingMessage({
      title: 'Loading your test...',
      message: "It won't be long!",
    });
    setCountdownTime(timerSeconds);
    setSelectedSubject(subject);

    setTimeout(() => {
      setData(quizData);
      setIsQuizStarted(true);
      setLoading(false);
    }, 1000);
  };

  const endQuiz = result => {
    setLoading(true);
    setLoadingMessage({
      title: 'Calculating your results...',
      message: 'Just a moment!',
    });

    setTimeout(() => {
      setIsQuizStarted(false);
      setIsQuizCompleted(true);
      setResultData(result);
      setLoading(false);
    }, 1500);
  };

  const replayQuiz = () => {
    setLoading(true);
    setLoadingMessage({
      title: 'Preparing another attempt...',
      message: "It won't take long!",
    });

    const shuffledData = shuffle(data).map(withShuffledOptions);

    setData(shuffledData);

    setTimeout(() => {
      setIsQuizStarted(true);
      setIsQuizCompleted(false);
      setResultData(null);
      setLoading(false);
    }, 1000);
  };

  const resetQuiz = () => {
    setLoading(true);
    setLoadingMessage({
      title: 'Returning to home...',
      message: 'Thank you for practicing!',
    });

    setTimeout(() => {
      setData(null);
      setCountdownTime(null);
      setIsQuizStarted(false);
      setIsQuizCompleted(false);
      setResultData(null);
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      {loading && <Loader {...loadingMessage} />}
      {!loading && !isQuizStarted && !isQuizCompleted && (
        <Main startQuiz={startQuiz} />
      )}
      {!loading && isQuizStarted && (
        <Quiz
          data={data}
          countdownTime={countdownTime}
          endQuiz={endQuiz}
          subjectLabel={
            CATEGORIES.find(c => c.value === selectedSubject)?.text || 'Any Category'
          }
        />
      )}
      {!loading && isQuizCompleted && (
        <Result {...resultData} replayQuiz={replayQuiz} resetQuiz={resetQuiz} />
      )}
    </Layout>
  );
};

export default App;
