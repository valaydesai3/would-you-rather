export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export function receiveQuestions(qustions) {
  return {
    type: RECEIVE_QUESTIONS,
    qustions,
  };
}
