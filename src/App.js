import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser } = this.props;

    return (
      <BrowserRouter>
        <div className="app">
          {authedUser === null ? (
            <Route render={() => <Login />} />
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

export default connect(mapStateToProps)(App);
