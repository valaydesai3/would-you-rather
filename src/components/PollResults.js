import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PollResults extends Component {
  static propTypes = {
    author: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    const { author, question, user } = this.props;

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];
    const optionOnePercent = ((optionOneVotes * 100) / totalVotes).toFixed(2);
    const optionTwoPercent = ((optionTwoVotes * 100) / totalVotes).toFixed(2);

    const progressFillStyle = {
      common: {
        display: 'flex',
        height: '25px',
        backgroundColor: '#2fbfa5',
        borderRadius: '5px',
        color: '#fff',
        alignItems: 'center',
        fontSize: '12px',
        paddingRight: '5px',
      },
      optionOne: {
        width: `${optionOnePercent}%`,
        justifyContent: optionOnePercent === '0.00' ? 'flex-start' : 'flex-end',
      },
      optionTwo: {
        width: `${optionTwoPercent}%`,
        justifyContent: optionTwoPercent === '0.00' ? 'flex-start' : 'flex-end',
      },
    };

    return (
      <div className="card">
        <div className="card-header">{author.name} asks:</div>
        <div className="card-img">
          <img src={author.avatarURL} alt="avatar" />
        </div>
        <div className="card-content">
          <ul className="pollresult">
            <li>
              <h4>Results:</h4>
            </li>
            <li>
              <div
                className={`pollresult-question ${
                  userVote === 'optionOne' ? 'your-answer' : 'other-answer'
                }`}
              >
                {userVote === 'optionOne' && (
                  <div className="vote-badge">Your vote</div>
                )}
                <p>Would you rather {question.optionOne.text}?</p>
                <div className="progress-wrapper">
                  <div className="progress-bar">
                    <div
                      style={{
                        ...progressFillStyle.common,
                        ...progressFillStyle.optionOne,
                      }}
                    >
                      <span>{optionOnePercent}%</span>
                    </div>
                  </div>
                </div>
                <p className="total-votes">
                  {optionOneVotes} out of {totalVotes} votes
                </p>
              </div>
            </li>
            <li>
              <div
                className={`pollresult-question ${
                  userVote === 'optionTwo' ? 'your-answer' : 'other-answer'
                }`}
              >
                {userVote === 'optionTwo' && (
                  <div className="vote-badge">Your vote</div>
                )}
                <p>Would you rather {question.optionTwo.text}?</p>
                <div className="progress-wrapper">
                  <div className="progress-bar">
                    <div
                      style={{
                        ...progressFillStyle.common,
                        ...progressFillStyle.optionTwo,
                      }}
                    >
                      <span>{optionTwoPercent}%</span>
                    </div>
                  </div>
                </div>
                <p className="total-votes">
                  {optionTwoVotes} out of {totalVotes} votes
                </p>
              </div>
            </li>
          </ul>
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
    author,
    question,
    user,
  };
}

export default connect(mapStateToProps)(PollResults);
