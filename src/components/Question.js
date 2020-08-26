import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Question extends Component {
  viewPoll = (e, qid) => {
    this.props.history.push(`/questions/${qid}`);
  };
  render() {
    const { question, author } = this.props;
    return (
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
          <span>Would you rather...</span>
          <h3>{question.optionOne.text}</h3>
          <button onClick={(e) => this.viewPoll(e, question.id)}>
            View Poll
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, { id }) {
  return {
    question: questions[id],
    author: users[questions[id].author],
  };
}

export default withRouter(connect(mapStateToProps)(Question));
