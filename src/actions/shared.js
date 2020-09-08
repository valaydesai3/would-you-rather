import { getInitialData, saveQuestionAnswer, saveQuestion } from '../utils/api';
import { receiveQuestions, addQuestionAnswer, addQuestion } from './questions';
import { receiveUsers, addUserAnswer, addUserQuestion } from './users';

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

export function handleQuestion(question) {
  return (dispatch) => {
    return saveQuestion(question).then((question) => {
      dispatch(addQuestion(question));
      dispatch(addUserQuestion(question));
    });
  };
}
