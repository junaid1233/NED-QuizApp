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
  List,
} from 'semantic-ui-react';

import mindImg from '../../images/mind.svg';
import { CATEGORIES } from '../../constants';
import { prepareQuizQuestions, getAllQuestions } from '../../services/questionService';
import { TEST_DURATION_SECONDS, TOTAL_QUESTIONS } from '../../constants/quizConfig';

import Offline from '../Offline';

const Main = ({ startQuiz }) => {
  const [category, setCategory] = useState('0');
  const [processing, setProcessing] = useState(false);
  const [offline] = useState(false);

  const startTest = () => {
    setProcessing(true);

    setTimeout(() => {
      const prepared = prepareQuizQuestions(getAllQuestions());
      setProcessing(false);
      startQuiz(prepared, TEST_DURATION_SECONDS, category);
    }, 800);
  };

  if (offline) return <Offline />;

  const selectedSubject =
    CATEGORIES.find(c => c.value === category)?.text || 'Any Category';

  return (
    <Container>
      <Segment>
        <Item.Group divided>
          <Item>
            <Item.Image src={mindImg} />
            <Item.Content>
              <Item.Header>
                <h1>NED MasterPrep</h1>
                <p style={{ fontWeight: 400, fontSize: '1rem', color: '#666' }}>
                  Master&apos;s Admission Test Preparation — CIS Engineering
                </p>
              </Item.Header>

              <Message info size="small">
                <Message.Content>
                  Independent preparation platform. Not officially affiliated with or
                  endorsed by NED University.
                </Message.Content>
              </Message>

              <Divider />

              <Item.Meta>
                <p><strong>Select Subject</strong></p>
                <Dropdown
                  fluid
                  selection
                  name="category"
                  placeholder="Select Subject"
                  options={CATEGORIES}
                  value={category}
                  onChange={(e, { value }) => setCategory(value)}
                  disabled={processing}
                />
              </Item.Meta>

              <Divider />

              <List bulleted>
                <List.Item><strong>Questions:</strong> {TOTAL_QUESTIONS}</List.Item>
                <List.Item><strong>Time:</strong> 60 minutes</List.Item>
                <List.Item><strong>Mode:</strong> Full practice test</List.Item>
                <List.Item>
                  You may <strong>submit early</strong> — completing all questions is not required.
                </List.Item>
              </List>

              <Divider />

              <Item.Extra>
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={
                    processing
                      ? 'Preparing Test...'
                      : `Start Test — ${selectedSubject}`
                  }
                  onClick={startTest}
                  disabled={!category || processing}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment color="blue">
        <Item.Content>
          <Item.Header as="h3" style={{ color: '#0b5ed7' }}>
            Note for Test Takers
          </Item.Header>
          <Item.Description style={{ fontSize: '1.05em', paddingTop: '0.5em' }}>
            All subjects currently use the same question set. Subject-specific questions
            will be added later. Report mistakes: <strong>0309-2547332 (Junaid)</strong>
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
