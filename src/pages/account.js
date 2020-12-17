import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Container, Row, Col, Spinner } from 'reactstrap';
import UserProfile from '../components/UserProfile';
// Redux
import { connect } from 'react-redux';
// Icons
import settings from '../img/settings.svg'
import briefcase from '../img/briefcase.svg'
import starFull from '../img/star-full-white.svg'
import map from '../img/map.svg'
import users from '../img/users.svg'

const Account = (props) => {
  const [state, setState] = useState({
    activeSection: 'settings'
  });

  const handleSection = (section) => {
    setState({ activeSection: section})
  }

  const haveToken = document.cookie.match(/^(.*;)?\s*jwt\s*=\s*[^;]+(.*)?$/)

  useEffect(() => {
    !haveToken && !props.user.authenticated && props.history.push('/');
    props.match.params.section && handleSection(props.match.params.section);
  }, [props.history, props.user.authenticated, props.match.params.section, haveToken]);

  const navItem = (link, text, icon, active) => (
    <li className={`${active ? `side-nav--active` : ''}`}>
      <Link to={link}>
        <img className="nav__icon" src={icon} alt='Nav Icon' />
        {text}
      </Link>
    </li>
  )

  const adminNav = props.user.role === 'admin' ? (
    <div className="admin-nav">
      <h5 className="admin-nav__heading">Admin</h5>
      <ul className="side-nav">
      {navItem('#', 'Manage stores', map)}
      {navItem('#', 'Manage users', users)}
      {navItem('#', 'Manage reviews', starFull)}
      {navItem('#', 'Manage booking', briefcase)}
      </ul>
    </div>
  ) : null;

  const pageRender = (section) => {
    switch (section) {
    case 'settings':
      return <UserProfile />
    case 'myGear':
      return null
    case 'myReviews':
      return null
    default:
      return <UserProfile />
    };
  };

  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            {navItem('/account/settings', 'Settings', settings, state.activeSection === 'settings' ? true : false)}
            {navItem('/account/myGear', 'My Gear', briefcase, state.activeSection === 'myGear' ? true : false)}
            {navItem('/account/myReviews', 'My reviews', starFull, state.activeSection === 'myReviews' ? true : false)}
          </ul>
          {adminNav}
        </nav>
        <div className="user-view__content">
          {pageRender(state.activeSection)}
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Account);
