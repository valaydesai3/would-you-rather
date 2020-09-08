import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const Question = (props) => {
  const { question, author } = props;

  const viewPoll = (qid) => {
    props.history.push(`/questions/${qid}`);
  };

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
          <button onClick={() => viewPoll(question.id)}>View Poll</button>
        </div>
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
};

function mapStateToProps({ questions, users }, { id }) {
  return {
    question: questions[id],
    author: users[questions[id].author],
  };
}

export default withRouter(connect(mapStateToProps)(Question));
