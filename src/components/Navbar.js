import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Navbar extends Component {
  static propTypes = {
    authedUser: PropTypes.object.isRequired,
  };
  render() {
    const { authedUser } = this.props;
    return (
      <div>
        <nav>
          <a href="/">Home</a>
          <a href="/"> | New Question</a>
          <a href="/"> | Leader Board</a>
          <span>Hello, {authedUser.name}</span>
          <span>
            <img
              src={authedUser.avatarURL}
              alt="avatar"
              style={{ width: '32px', height: '32px', borderRadius: '50%' }}
            />
          </span>
          <a href="/"> | Logout</a>
        </nav>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser: users[authedUser],
  };
}

export default connect(mapStateToProps)(Navbar);
