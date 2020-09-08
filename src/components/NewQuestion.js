import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleQuestion } from '../actions/shared';

const NewQuestion = (props) => {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === 'optionOne') {
      setOptionOne(e.target.value);
    }
    if (e.target.name === 'optionTwo') {
      setOptionTwo(e.target.value);
    }
  };

  const handleValidation = () => {
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

    setErrors(errors);
    return formValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { author, addQuestion } = props;
    if (handleValidation()) {
      addQuestion({
        author,
        optionOneText: optionOne,
        optionTwoText: optionTwo,
      });
      setRedirect(true);
    }
  };

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
            onChange={handleChange}
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
            onChange={handleChange}
          />
          {errors.optionTwo && (
            <span className="error">{errors.optionTwo}</span>
          )}
        </fieldset>

        <fieldset>
          <button onClick={handleSubmit}>Submit</button>
        </fieldset>
      </div>
    </div>
  );
};

NewQuestion.propTypes = {
  author: PropTypes.string.isRequired,
  addQuestion: PropTypes.func.isRequired,
};

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
