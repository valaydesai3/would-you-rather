import React, { Component } from 'react';
import { connect } from 'react-redux';

class Leaderboard extends Component {
  render() {
    const { leaderboard } = this.props;
    return leaderboard.map((user) => (
      <div
        key={user.id}
        style={{
          maxWidth: '200px',
          border: '2px solid indigo',
          padding: '10px',
          margin: '10px',
        }}
      >
        <h3>{user.name}</h3>
        <div>
          <img
            src={user.avatarURL}
            alt="avatar"
            style={{ height: '64px', width: '64px', borderRadius: '50%' }}
          />
        </div>
        <div>
          <div
            style={{ border: '1px solid gray', margin: '5px', padding: '5px' }}
          >
            <p>
              Answered questions <b>{user.questionsAnswered}</b>
            </p>
          </div>
          <div
            style={{ border: '1px solid gray', margin: '5px', padding: '5px' }}
          >
            <p>
              Created questions <b>{user.questionsCreated}</b>
            </p>
          </div>
          <div
            style={{ border: '1px solid gray', margin: '5px', padding: '5px' }}
          >
            <p>
              Score <b>{user.score}</b>
            </p>
          </div>
        </div>
      </div>
    ));
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
