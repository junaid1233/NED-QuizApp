import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
} from 'semantic-ui-react';

import mindImg from '../../images/mind.svg';

import {
  CATEGORIES,
  NUM_OF_QUESTIONS,
  DIFFICULTY,
  QUESTIONS_TYPE,
  COUNTDOWN_TIME,
} from '../../constants';
import { shuffle } from '../../utils';

import Offline from '../Offline';

//Shariq Mehdi Add Question
import question_data from './question.json';

const Main = ({ startQuiz }) => {
  const [category, setCategory] = useState('0');
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('easy');
  const [questionsType, setQuestionsType] = useState('0');
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: (60*60),
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldsSelected = false;
  if (
    category &&
    numOfQuestions &&
    difficulty &&
    questionsType &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  const fetchData = () => {
    setProcessing(true);

    if (error) setError(null);

    setTimeout(() => {
      const { response_code, results } = question_data;
      results.forEach(element => {
        element.options = shuffle([
          element.correct_answer,
          ...element.incorrect_answers,
        ]);
      });

      setProcessing(false);
      startQuiz(
        results,
        countdownTime.hours + countdownTime.minutes + countdownTime.seconds
      );
    }, 1000)

    // const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`;

    // fetch(API)
    //   .then(respone => respone.json())
    //   .then(data =>
    //     setTimeout(() => {
    //       const { response_code, results } = data;

    //       if (response_code === 1) {
    //         const message = (
    //           <p>
    //             The API doesn't have enough questions for your query. (Ex.
    //             Asking for 50 Questions in a Category that only has 20.)
    //             <br />
    //             <br />
    //             Please change the <strong>No. of Questions</strong>,{' '}
    //             <strong>Difficulty Level</strong>, or{' '}
    //             <strong>Type of Questions</strong>.
    //           </p>
    //         );

    //         setProcessing(false);
    //         setError({ message });

    //         return;
    //       }

    //       results.forEach(element => {
    //         element.options = shuffle([
    //           element.correct_answer,
    //           ...element.incorrect_answers,
    //         ]);
    //       });

    //       setProcessing(false);
    //       startQuiz(
    //         results,
    //         countdownTime.hours + countdownTime.minutes + countdownTime.seconds
    //       );
    //     }, 1000)
    //   )
    //   .catch(error =>
    //     setTimeout(() => {
    //       if (!navigator.onLine) {
    //         setOffline(true);
    //       } else {
    //         setProcessing(false);
    //         setError(error);
    //       }
    //     }, 1000)
    //   );
  };

  if (offline) return <Offline />;

  return (
    <Container>
      <Segment>
        <Item.Group divided>
          <Item>
            <Item.Image src={mindImg} />
            <Item.Content>
              <Item.Header>
                <h1>QuizApp for NED master Test</h1>
              </Item.Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
                <p>In which category do you want to play the quiz?</p>
                <Dropdown
                  fluid
                  selection
                  name="category"
                  placeholder="Select Quiz Category"
                  header="Select Quiz Category"
                  options={CATEGORIES}
                  value={category}
                  onChange={(e, { value }) => setCategory(value)}
                  disabled={processing}
                />
              </Item.Meta>
              <Divider />
              <Item.Extra>
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={processing ? 'Processing...' : 'Play Now'}
                  onClick={fetchData}
                  disabled={!allFieldsSelected || processing}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <br />
      <Segment color="blue">
  <Item.Content>
    <Item.Header as="h3" style={{ color: '#0b5ed7' }}>
      📢 Note for Test Takers
    </Item.Header>
    <Item.Description style={{ fontSize: '1.1em', paddingTop: '0.5em' }}>
      This quiz application is designed specifically to help candidates prepare for the NED University Master's Admission Test in Computer & Information Systems Engineering.  
      <br />
      If you notice any mistakes or have suggestions for improvement, please contact:
      <strong> 0309-2547332 (Junaid)</strong>
    </Item.Description>
  </Item.Content>
</Segment>

    </Container>
  
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
