import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleInitialData } from './actions/shared';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Home from './components/Home';
import QuestionDetails from './components/QuestionDetails';
import './App.css';

class App extends Component {
  static propTypes = {
    authedUser: PropTypes.bool.isRequired,
    handleInitialData: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authedUser } = this.props;

    return (
      <BrowserRouter>
        <div className="app">
          {authedUser ? (
            <Route exact path="/" component={SignIn} />
          ) : (
            <Fragment>
              <Navbar />
              <Route exact path="/" component={Home} />
              <Route
                path="/questions/:question_id"
                component={QuestionDetails}
              />
            </Fragment>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser: authedUser === null };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => dispatch(handleInitialData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
