import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleAnswer } from '../actions/shared';
import PollResults from './PollResults';

class QuestionDetails extends Component {
  static propTypes = {
    authedUser: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
  };

  state = {
    selectedOption: '',
  };

  optionSelected = (e) => {
    this.setState({ selectedOption: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      authedUser,
      question: { id },
      saveQuestionAnswer,
    } = this.props;
    const { selectedOption } = this.state;
    saveQuestionAnswer({ authedUser, qid: id, answer: selectedOption });
  };

  render() {
    const { question, author, answer } = this.props;
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
              <p>
                <input
                  type="radio"
                  name="options"
                  value="optionOne"
                  onChange={this.optionSelected}
                />{' '}
                {question.optionOne.text}
              </p>
              <p>
                <input
                  type="radio"
                  name="options"
                  value="optionTwo"
                  onChange={this.optionSelected}
                />{' '}
                {question.optionTwo.text}
              </p>
              <div className="card-content-action">
                <button onClick={this.handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

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
