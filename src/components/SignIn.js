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
      <div>
        <h2>Sign In</h2>
        <select onChange={this.userSelected} value={user}>
          <option value="" defaultValue="" disabled>
            Select User
          </option>
          {items}
        </select>
        <br />
        <button disabled={user === ''} onClick={this.handleSubmit}>
          Sign In
        </button>
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
