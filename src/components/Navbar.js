import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

class Navbar extends Component {
  static propTypes = {
    authedUser: PropTypes.object.isRequired,
  };
  handleLogout = () => {
    this.props.setAuthedUser(null);
  };
  render() {
    const { authedUser } = this.props;
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
          <a href="/"> | New Question</a>
          <Link to="/leaderboard"> | Leader Board</Link>
          <span>Hello, {authedUser.name}</span>
          <span>
            <img
              src={authedUser.avatarURL}
              alt="avatar"
              style={{ width: '32px', height: '32px', borderRadius: '50%' }}
            />
          </span>
          <Link to="/" onClick={this.handleLogout}>
            {' '}
            | Logout
          </Link>
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

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: (id) => dispatch(setAuthedUser(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
