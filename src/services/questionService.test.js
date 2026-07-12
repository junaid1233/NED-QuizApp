import {
  getAllQuestions,
  withShuffledOptions,
  getTotalQuestionCount,
} from '../services/questionService';
import { TOTAL_QUESTIONS } from '../constants/quizConfig';

describe('questionService', () => {
  test('getAllQuestions returns 100 questions', () => {
    const result = getAllQuestions();
    expect(result).toHaveLength(TOTAL_QUESTIONS);
  });

  test('getAllQuestions returns same count for any subject (until banks split)', () => {
    const all = getAllQuestions('0');
    const ai = getAllQuestions('Artificial Intelligence');
    expect(all).toHaveLength(TOTAL_QUESTIONS);
    expect(ai).toHaveLength(TOTAL_QUESTIONS);
  });

  test('withShuffledOptions does not mutate source', () => {
    const original = {
      correct_answer: 'A',
      incorrect_answers: ['B', 'C', 'D'],
    };
    const prepared = withShuffledOptions(original);
    expect(prepared.options).toHaveLength(4);
    expect(original.options).toBeUndefined();
    expect(prepared.options).toContain('A');
  });

  test('getTotalQuestionCount returns 100', () => {
    expect(getTotalQuestionCount()).toBe(100);
  });
});
