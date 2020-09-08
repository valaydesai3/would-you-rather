import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleAnswer } from '../actions/shared';
import PollResults from './PollResults';

const QuestionDetails = (props) => {
  const { question, author, answer } = props;
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');

  const optionSelected = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleValidation = () => {
    let error = '';
    if (selectedOption === '') {
      error = 'Please select your answer';
      setError(error);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      authedUser,
      question: { id },
      saveQuestionAnswer,
    } = props;
    if (handleValidation()) {
      saveQuestionAnswer({ authedUser, qid: id, answer: selectedOption });
    }
  };

  return (
    <div className="question-details">
      {answer ? (
        <PollResults id={question.id} />
      ) : (
        <div className="card">
          <div className="card-header">{author.name} asks:</div>
          <div className="card-img">
            <img src={author.avatarURL} alt="avatar" />
          </div>
          <div className="card-content">
            <p className="card-content-label">Would you rather...</p>
            <ul>
              <li>
                <input
                  type="radio"
                  name="options"
                  value="optionOne"
                  onChange={optionSelected}
                />
                <label htmlFor="options">{question.optionOne.text}</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="options"
                  value="optionTwo"
                  onChange={optionSelected}
                />
                <label htmlFor="options">{question.optionTwo.text}</label>
              </li>
              {error && (
                <li>
                  <span className="error">{error}</span>
                </li>
              )}
              <li>
                <div className="card-content-action">
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

QuestionDetails.propTypes = {
  authedUser: PropTypes.string.isRequired,
  question: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
};

function mapStateToProps({ authedUser, questions, users }, ownProps) {
  const { question_id } = ownProps.match.params;
  const question = questions[question_id];
  const author = users[questions[question_id].author];

  const answers = users[authedUser].answers;
  let answer;
  if (answers.hasOwnProperty(question_id)) {
    answer = answers[question_id];
  }
  return { authedUser, question, author, answer };
}

function mapDispatchToProps(dispatch) {
  return {
    saveQuestionAnswer: (answer) => dispatch(handleAnswer(answer)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
