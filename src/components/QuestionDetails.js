import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuestionDetails extends Component {
  state = {
    selectedOption: '',
  };

  optionSelected = (e) => {
    this.setState({ selectedOption: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
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
          <span>Would you rather</span>
          <p>
            <input
              type="radio"
              name="options"
              value="optionOne"
              onChange={this.optionSelected}
            />{' '}
            {question.optionOne.text}
          </p>
          <p>
            <input
              type="radio"
              name="options"
              value="optionTwo"
              onChange={this.optionSelected}
            />{' '}
            {question.optionTwo.text}
          </p>
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users }, ownProps) {
  const { question_id } = ownProps.match.params;
  const question = questions[question_id];
  const author = users[questions[question_id].author];
  return { question, author };
}

export default connect(mapStateToProps)(QuestionDetails);
