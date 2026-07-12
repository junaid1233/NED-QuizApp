import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Menu,
  Header,
  Progress,
} from 'semantic-ui-react';
import he from 'he';
import Swal from 'sweetalert2';

import Countdown from '../Countdown';
import { getLetter } from '../../utils';

const Quiz = ({ data, countdownTime, endQuiz, subjectLabel }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSlectedAns, setUserSlectedAns] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    if (questionIndex > 0) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questionIndex]);

  const scoreAnswer = useCallback(
    (index, answer) => {
      const correct = he.decode(data[index].correct_answer);
      const point = answer === correct ? 1 : 0;
      return {
        question: he.decode(data[index].question),
        user_answer: answer,
        correct_answer: correct,
        point,
      };
    },
    [data]
  );

  const finishQuiz = useCallback(
    (elapsed, includeCurrent = true) => {
      let finalCorrect = correctAnswers;
      const finalQna = [...questionsAndAnswers];

      if (includeCurrent && userSlectedAns !== null) {
        const entry = scoreAnswer(questionIndex, userSlectedAns);
        finalCorrect += entry.point;
        finalQna.push(entry);
      }

      const startIdx =
        includeCurrent && userSlectedAns !== null
          ? questionIndex + 1
          : questionIndex;

      for (let i = startIdx; i < data.length; i++) {
        finalQna.push({
          question: he.decode(data[i].question),
          user_answer: null,
          correct_answer: he.decode(data[i].correct_answer),
          point: 0,
        });
      }

      endQuiz({
        totalQuestions: data.length,
        correctAnswers: finalCorrect,
        timeTaken: elapsed,
        questionsAndAnswers: finalQna,
      });
    },
    [
      correctAnswers,
      data,
      endQuiz,
      questionIndex,
      questionsAndAnswers,
      scoreAnswer,
      userSlectedAns,
    ]
  );

  const handleItemClick = (e, { name }) => {
    setUserSlectedAns(name);
  };

  const handleNext = () => {
    const entry = scoreAnswer(questionIndex, userSlectedAns);
    const point = entry.point;

    if (questionIndex === data.length - 1) {
      return endQuiz({
        totalQuestions: data.length,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: [...questionsAndAnswers, entry],
      });
    }

    setCorrectAnswers(prev => prev + point);
    setQuestionIndex(prev => prev + 1);
    setUserSlectedAns(null);
    setQuestionsAndAnswers(prev => [...prev, entry]);
  };

  const handleSubmitTest = () => {
    Swal.fire({
      title: 'Submit test?',
      text: 'You can submit before finishing all questions. Unanswered questions will be marked incorrect.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit',
      cancelButtonText: 'Continue test',
      confirmButtonColor: '#2185d0',
    }).then(result => {
      if (result.isConfirmed) {
        finishQuiz(timeTaken, true);
      }
    });
  };

  const timeOver = useCallback(elapsed => finishQuiz(elapsed, true), [finishQuiz]);

  const progress = ((questionIndex + 1) / data.length) * 100;

  return (
    <Item.Header>
      <Container>
        <Progress percent={Math.round(progress)} indicating progress>
          Question {questionIndex + 1} of {data.length} · {subjectLabel}
        </Progress>
        <Segment>
          <Item.Group divided>
            <Item>
              <Item.Content>
                <Item.Extra>
                  <Header as="h2" block floated="left">
                    <Icon name="info circle" />
                    <Header.Content>
                      {`Q${questionIndex + 1} / ${data.length}`}
                      <Header.Subheader>{subjectLabel}</Header.Subheader>
                    </Header.Content>
                  </Header>
                  <Countdown
                    countdownTime={countdownTime}
                    timeOver={timeOver}
                    setTimeTaken={setTimeTaken}
                  />
                </Item.Extra>
                <br />
                <Item.Meta>
                  <Message size="huge" floating>
                    <b>{`Q. ${he.decode(data[questionIndex].question)}`}</b>
                  </Message>
                  <br />
                  <Item.Description>
                    <h3>Select one answer:</h3>
                  </Item.Description>
                  <Divider />
                  <Menu vertical fluid size="massive">
                    {data[questionIndex].options.map((option, i) => {
                      const letter = getLetter(i);
                      const decodedOption = he.decode(option);

                      return (
                        <Menu.Item
                          key={`${questionIndex}-${decodedOption}`}
                          name={decodedOption}
                          active={userSlectedAns === decodedOption}
                          onClick={handleItemClick}
                        >
                          <b style={{ marginRight: '8px' }}>{letter}</b>
                          {decodedOption}
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                </Item.Meta>
                <Divider />
                <Item.Extra>
                  <Button
                    negative
                    content="Submit Test"
                    onClick={handleSubmitTest}
                    floated="left"
                    size="big"
                    icon="check"
                    labelPosition="left"
                  />
                  <Button
                    primary
                    content={questionIndex === data.length - 1 ? 'Submit' : 'Next'}
                    onClick={handleNext}
                    floated="right"
                    size="big"
                    icon="right chevron"
                    labelPosition="right"
                    disabled={!userSlectedAns}
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <br />
      </Container>
    </Item.Header>
  );
};

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired,
  subjectLabel: PropTypes.string,
};

Quiz.defaultProps = {
  subjectLabel: 'Any Category',
};

export default Quiz;
