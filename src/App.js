import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import SignIn from './components/SignIn';
import Home from './components/Home';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authedUser } = this.props;

    return (
      <BrowserRouter>
        <div className="app">
          {authedUser === null ? (
            <Route render={() => <SignIn />} />
          ) : (
            <Route exact path="/" component={Home} />
          )}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => dispatch(handleInitialData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
