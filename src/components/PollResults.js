import React, { Component } from 'react';
import { connect } from 'react-redux';

class PollResults extends Component {
  render() {
    const { author, question, user } = this.props;

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];

    return (
      <div
        style={{
          maxWidth: '200px',
          border: '2px solid indigo',
          padding: '10px',
          margin: '10px',
        }}
      >
        <h3>Asked by {author.name}</h3>
        <div>
          <img
            src={author.avatarURL}
            alt="avatar"
            style={{ height: '64px', width: '64px', borderRadius: '50%' }}
          />
        </div>
        <div>
          <h4>Results:</h4>
          <div
            style={{ border: '1px solid gray', margin: '5px', padding: '5px' }}
          >
            {userVote === 'optionOne' && <i>Your vote</i>}
            <p>Would you rather {question.optionOne.text}?</p>
            <progress
              value={((optionOneVotes * 100) / totalVotes).toFixed(2)}
              max="100"
            ></progress>
            <p>
              {optionOneVotes} out of {totalVotes}
            </p>
          </div>
          <div
            style={{ border: '1px solid gray', margin: '5px', padding: '5px' }}
          >
            {userVote === 'optionTwo' && <i>Your vote</i>}
            <p>Would you rather {question.optionTwo.text}?</p>
            <progress
              value={((optionTwoVotes * 100) / totalVotes).toFixed(2)}
              max="100"
            ></progress>
            <p>
              {optionTwoVotes} out of {totalVotes}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, ownProps) {
  const qid = ownProps.id;
  const question = questions[qid];
  const author = users[questions[qid].author];
  const user = users[authedUser];
  return {
    authedUser,
    author,
    question,
    user,
  };
}

export default connect(mapStateToProps)(PollResults);
