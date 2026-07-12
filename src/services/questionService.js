import questionData from '../components/Main/question.json';
import { shuffle } from '../utils';
import { TOTAL_QUESTIONS } from '../constants/quizConfig';

export const ALL_SUBJECTS = '0';

function getUniqueSubjects(questions) {
  return [...new Set(questions.map(q => q.category))].sort();
}

/** Categories derived from the actual question bank */
export const SUBJECT_CATEGORIES = [
  { key: ALL_SUBJECTS, text: 'All Subjects', value: ALL_SUBJECTS },
  ...getUniqueSubjects(questionData.results).map(name => ({
    key: name,
    text: name,
    value: name,
  })),
];

/**
 * Returns all questions (same set for every subject until subject banks are added).
 * @param {string} _selectedSubject - reserved for future subject-specific banks
 */
export function getAllQuestions(_selectedSubject = ALL_SUBJECTS) {
  const pool = questionData.results.slice(0, TOTAL_QUESTIONS);
  return shuffle([...pool]);
}

/**
 * Return a new question object with shuffled options (does not mutate source).
 */
export function withShuffledOptions(question) {
  const options = shuffle([
    question.correct_answer,
    ...question.incorrect_answers,
  ]);
  return { ...question, options };
}

/**
 * Prepare a list of questions for the quiz session.
 */
export function prepareQuizQuestions(questions) {
  return questions.map(withShuffledOptions);
}

export function getTotalQuestionCount() {
  return Math.min(questionData.results.length, TOTAL_QUESTIONS);
}
