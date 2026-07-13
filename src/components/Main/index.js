import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

import { CATEGORIES } from '../../constants';
import { prepareQuizQuestions, getAllQuestions } from '../../services/questionService';
import { TEST_DURATION_SECONDS, TOTAL_QUESTIONS } from '../../constants/quizConfig';
import { BRAND, AUTHOR } from '../../constants/brand';
import BrandMark from '../BrandMark';
import SocialLinks from '../SocialLinks';
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
    <div className="start-screen">
      <section className="start-panel" aria-labelledby="start-heading">
        <div className="start-panel__intro">
          <BrandMark variant="hero" />
          <p className="start-panel__support" id="start-heading">
            {BRAND.subtitle} — timed practice for the Master&apos;s admission test.
          </p>
          <p className="start-panel__disclaimer">{BRAND.disclaimer}</p>
        </div>

        <div className="start-panel__form">
          <div>
            <label className="start-panel__label" htmlFor="subject-select">
              Subject
            </label>
            <Dropdown
              id="subject-select"
              className="start-panel__dropdown"
              fluid
              selection
              name="category"
              placeholder="Select Subject"
              options={CATEGORIES}
              value={category}
              onChange={(e, { value }) => setCategory(value)}
              disabled={processing}
            />
          </div>

          <div className="start-panel__meta" aria-label="Test details">
            <div className="start-panel__meta-item">
              <span className="start-panel__meta-value">{TOTAL_QUESTIONS}</span>
              <span className="start-panel__meta-label">Questions</span>
            </div>
            <div className="start-panel__meta-item">
              <span className="start-panel__meta-value">60</span>
              <span className="start-panel__meta-label">Minutes</span>
            </div>
            <div className="start-panel__meta-item">
              <span className="start-panel__meta-value">Full</span>
              <span className="start-panel__meta-label">Practice</span>
            </div>
          </div>

          <p className="start-panel__hint">
            You can submit early — finishing every question is optional.
          </p>

          <button
            type="button"
            className="start-panel__cta"
            onClick={startTest}
            disabled={!category || processing}
          >
            {processing ? 'Preparing test…' : `Start Test — ${selectedSubject}`}
          </button>
        </div>

        <p className="start-panel__note">
          All subjects currently share the same question set. Report mistakes:{' '}
          <strong>
            {AUTHOR.phone} ({AUTHOR.name.split(' ')[0]})
          </strong>
        </p>

        <div className="start-panel__creator">
          <p className="start-panel__creator-text">
            Product by{' '}
            <a
              href="https://junaid-portfolio-mu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {AUTHOR.name}
            </a>
          </p>
          <SocialLinks />
        </div>
      </section>
    </div>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
