import React from 'react';
import { connect } from 'react-redux';
import PropTypes, { string } from 'prop-types';
import Tabs from '../components/Tabs';
import Question from './Question';

const Home = (props) => {
  const { answeredQuestions, unansweredQuestions } = props;
  return (
    <div>
      <Tabs>
        <div label="Unanswered Questions">
          {unansweredQuestions.length === 0
            ? `You've answered all the questions.`
            : unansweredQuestions.map((item) => (
                <Question key={item} id={item} />
              ))}
        </div>
        <div label="Answered Questions">
          {answeredQuestions.map((item) => (
            <Question key={item} id={item} />
          ))}
        </div>
      </Tabs>
    </div>
  );
};

Home.propTypes = {
  answeredQuestions: PropTypes.arrayOf(string).isRequired,
  unansweredQuestions: PropTypes.arrayOf(string).isRequired,
};

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
