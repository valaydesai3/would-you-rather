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
    errors: {},
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleValidation = () => {
    const { optionOne, optionTwo } = this.state;
    let errors = {};
    let formValid = true;

    if (optionOne === '') {
      errors['optionOne'] = 'Please Enter Option One';
      formValid = false;
    }
    if (optionTwo === '') {
      errors['optionTwo'] = 'Please Enter Option Two';
      formValid = false;
    }

    this.setState({ errors: errors });
    return formValid;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { author, addQuestion } = this.props;
    if (this.handleValidation()) {
      addQuestion({
        author,
        optionOneText: optionOne,
        optionTwoText: optionTwo,
      });
      this.setState({ redirect: true });
    }
  };

  render() {
    const { optionOne, optionTwo, redirect, errors } = this.state;
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
            {errors.optionOne && (
              <span className="error">{errors.optionOne}</span>
            )}
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
            {errors.optionTwo && (
              <span className="error">{errors.optionTwo}</span>
            )}
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
