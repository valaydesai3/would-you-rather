import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leaderboard extends Component {
  renderLeaderboard = () => {
    const { leaderboard } = this.props;

    return leaderboard.map((user) => (
      <div key={user.id} className="card">
        <div className="card-img">
          <img src={user.avatarURL} alt="avatar" />
        </div>
        <div className="card-content">
          <ul className="question-numbers">
            <li>
              <h3>{user.name}</h3>
            </li>
            <li className="label-counter">
              <span>Answered questions</span>{' '}
              <span className="counter">{user.questionsAnswered}</span>
            </li>
            <li className="label-counter">
              <span>Created questions</span>
              <span className="counter"> {user.questionsCreated}</span>
            </li>
          </ul>
        </div>
        <div className="card-content">
          <ul className="score">
            <li>
              <p>Score</p>
            </li>
            <li>
              <div className="counter score-badge">{user.score}</div>
            </li>
          </ul>
        </div>
      </div>
    ));
  };
  render() {
    return <div className="leaderboard">{this.renderLeaderboard()}</div>;
  }
}

function mapStateToProps({ users }) {
  const leaderboard = Object.values(users)
    .map((user) => ({
      id: user.id,
      avatarURL: user.avatarURL,
      name: user.name,
      questionsAnswered: Object.keys(user.answers).length,
      questionsCreated: user.questions.length,
      score: Object.keys(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => b.score - a.score);
  return { leaderboard };
}

export default connect(mapStateToProps)(Leaderboard);
