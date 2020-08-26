import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { string } from 'prop-types';
import Question from './Question';

class Home extends Component {
  static propTypes = {
    answeredQuestions: PropTypes.arrayOf(string).isRequired,
    unansweredQuestions: PropTypes.arrayOf(string).isRequired,
  };
  render() {
    const { answeredQuestions, unansweredQuestions } = this.props;
    return (
      <div>
        <p>Unanswered Questions</p>
        {unansweredQuestions.map((item) => (
          <Question key={item} id={item} />
        ))}

        <p>Answered Questions</p>
        {answeredQuestions.map((item) => (
          <Question key={item} id={item} />
        ))}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  const answeredQuestions = Object.keys(users[authedUser].answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  return {
    unansweredQuestions: Object.keys(questions)
      .filter((id) => !answeredQuestions.includes(id))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions,
  };
}

export default connect(mapStateToProps)(Home);
