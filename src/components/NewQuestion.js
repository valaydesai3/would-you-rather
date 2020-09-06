import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleQuestion } from '../actions/shared';

class NewQuestion extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    addQuestion: PropTypes.func.isRequired,
  };

  state = {
    optionOne: '',
    optionTwo: '',
    redirect: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // add validations
    const { optionOne, optionTwo } = this.state;
    const { author, addQuestion } = this.props;
    addQuestion({ author, optionOneText: optionOne, optionTwoText: optionTwo });
    this.setState({ redirect: true });
  };

  render() {
    const { optionOne, optionTwo, redirect } = this.state;
    return redirect ? (
      <Redirect to="/" />
    ) : (
      <div className="new-question-container">
        <div className="new-question-form">
          <h2>Create New Question</h2>
          <p>Complete the question:</p>
          <h3>Would you rather...</h3>
          <fieldset>
            <input
              type="text"
              name="optionOne"
              value={optionOne}
              required
              placeholder="Enter Option One Text Here"
              onChange={this.handleChange}
            />
          </fieldset>
          <p>
            <b>OR</b>
          </p>
          <fieldset>
            <input
              type="text"
              name="optionTwo"
              value={optionTwo}
              required
              placeholder="Enter Option Two Text Here"
              onChange={this.handleChange}
            />
          </fieldset>
          <fieldset>
            <button onClick={this.handleSubmit}>Submit</button>
          </fieldset>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    author: authedUser,
  };
}

function mapDistpathToProps(dispatch) {
  return {
    addQuestion: (question) => dispatch(handleQuestion(question)),
  };
}

export default connect(mapStateToProps, mapDistpathToProps)(NewQuestion);
