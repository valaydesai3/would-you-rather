import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Question extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
  };

  viewPoll = (e, qid) => {
    this.props.history.push(`/questions/${qid}`);
  };

  render() {
    const { question, author } = this.props;
    return (
      <div className="card">
        <div className="card-header">{author.name} asks:</div>
        <div className="card-img">
          <img src={author.avatarURL} alt="avatar" />
        </div>
        <div className="card-content">
          <p className="card-content-label">Would you rather...</p>
          <p>
            {`...`}
            {question.optionOne.text.substr(0, 10)}
            {`...`}
          </p>
          <div className="card-content-action">
            <button onClick={(e) => this.viewPoll(e, question.id)}>
              View Poll
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users }, { id }) {
  return {
    question: questions[id],
    author: users[questions[id].author],
  };
}

export default withRouter(connect(mapStateToProps)(Question));
