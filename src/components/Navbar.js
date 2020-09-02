import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

class Navbar extends Component {
  static propTypes = {
    authedUser: PropTypes.object.isRequired,
  };
  state = {
    activeId: 'home',
    toggleMenu: true,
  };
  handleLogout = () => {
    this.props.setAuthedUser(null);
  };
  handleClick = (event) => {
    const id = event.target.id;
    this.setState({ activeId: id, toggleMenu: true });
  };
  toggleMenu = () => {
    this.setState({ toggleMenu: !this.state.toggleMenu });
  };
  render() {
    const { authedUser } = this.props;
    const { activeId, toggleMenu } = this.state;

    return (
      <nav className="navbar">
        <div className="navbar-username">
          <span>Hello, {authedUser.name}</span>
          <span>
            <img src={authedUser.avatarURL} alt="avatar" />
          </span>
        </div>
        <a href="/#" className="toggle-button" onClick={this.toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className={toggleMenu ? 'navbar-links' : 'navbar-links active'}>
          <ul>
            <li>
              <Link
                id="home"
                to="/"
                className={activeId === 'home' ? 'active' : null}
                onClick={(event) => this.handleClick(event)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                id="add"
                to="/add"
                className={activeId === 'add' ? 'active' : null}
                onClick={(event) => this.handleClick(event)}
              >
                New Question
              </Link>
            </li>
            <li>
              <Link
                id="leaderboard"
                to="/leaderboard"
                className={activeId === 'leaderboard' ? 'active' : null}
                onClick={(event) => this.handleClick(event)}
              >
                Leader Board
              </Link>
            </li>
            <li>
              <Link id="logout" to="/" onClick={this.handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
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
