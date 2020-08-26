import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { string } from 'prop-types';
import Navbar from './Navbar';

class Home extends Component {
  static propTypes = {
    answeredQuestions: PropTypes.arrayOf(string).isRequired,
    unansweredQuestions: PropTypes.arrayOf(string).isRequired,
  };
  render() {
    const { answeredQuestions, unansweredQuestions } = this.props;
    return (
      <div>
        <Navbar />
        <p>Answered Questions</p>
        <ul>
          {answeredQuestions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>Unanswered Questions</p>
        <ul>
          {unansweredQuestions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
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
