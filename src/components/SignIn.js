import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { object } from 'prop-types';
import { setAuthedUser } from '../actions/authedUser';

class SignIn extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(object).isRequired,
    setAuthedUser: PropTypes.func.isRequired,
  };

  state = {
    user: '',
  };

  userSelected = (e) => {
    this.setState({ user: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user } = this.state;
    const { setAuthedUser } = this.props;
    setAuthedUser(user);
  };

  render() {
    const { users } = this.props;
    const { user } = this.state;
    const items = users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));
    return (
      <div className="signin">
        <div className="signin-header">
          <p className="welcome">Welcome to the Would You Rather App!</p>
          <p>Please sign in to continue</p>
        </div>
        <div className="signin-image-holder">
          <img className="signin-image" src="logo512.png" alt="logo" />
        </div>
        <h2 className="signin-label">Sign In</h2>
        <div className="signin-form">
          <select
            className="signin-select"
            onChange={this.userSelected}
            value={user}
          >
            <option value="" defaultValue="" disabled>
              Select User
            </option>
            {items}
          </select>
          <button
            className="signin-btn"
            disabled={user === ''}
            onClick={this.handleSubmit}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: (id) => dispatch(setAuthedUser(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
