import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAnswer } from '../actions/shared';
import PollResults from './PollResults';

class QuestionDetails extends Component {
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
      <div>
        {answer ? (
          <PollResults id={question.id} />
        ) : (
          <div
            style={{
              maxWidth: '200px',
              border: '2px solid indigo',
              padding: '10px',
              margin: '10px',
            }}
          >
            <h3>{author.name} asks:</h3>
            <div>
              <img
                src={author.avatarURL}
                alt="avatar"
                style={{ height: '64px', width: '64px', borderRadius: '50%' }}
              />
            </div>
            <div>
              <span>Would you rather</span>
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
              <button onClick={this.handleSubmit}>Submit</button>
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
