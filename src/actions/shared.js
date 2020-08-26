import { getInitialData, saveQuestionAnswer } from '../utils/api';
import { receiveQuestions, addQuestionAnswer } from './questions';
import { receiveUsers, addUserAnswer } from './users';

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function handleAnswer({ authedUser, qid, answer }) {
  return (dispatch) => {
    return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(addQuestionAnswer(authedUser, qid, answer));
      dispatch(addUserAnswer(authedUser, qid, answer));
    });
  };
}
