import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';

const Navbar = (props) => {
  const [activeId, setActiveId] = useState('home');
  const [toggleMenu, setToggleMenu] = useState(true);
  const { authedUser } = props;

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleClick = (event) => {
    const id = event.target.id;
    setActiveId(id);
    setToggleMenu(true);
  };

  const handleLogout = () => {
    props.setAuthedUser(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-username">
        <span>Hello, {authedUser.name}</span>
        <span>
          <img src={authedUser.avatarURL} alt="avatar" />
        </span>
      </div>
      <a href="/#" className="toggle-button" onClick={handleToggleMenu}>
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
              onClick={(event) => handleClick(event)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              id="add"
              to="/add"
              className={activeId === 'add' ? 'active' : null}
              onClick={(event) => handleClick(event)}
            >
              New Question
            </Link>
          </li>
          <li>
            <Link
              id="leaderboard"
              to="/leaderboard"
              className={activeId === 'leaderboard' ? 'active' : null}
              onClick={(event) => handleClick(event)}
            >
              Leader Board
            </Link>
          </li>
          <li>
            <Link id="logout" to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  authedUser: PropTypes.object.isRequired,
};

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
