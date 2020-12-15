import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Container, Row, Col, Spinner } from 'reactstrap';
// Redux
import { connect } from 'react-redux';
// Actions
import { getProducts } from '../redux/actions/dataActions';
// Icons
import settings from '../img/settings.svg'
import briefcase from '../img/briefcase.svg'
import starFull from '../img/star-full.svg'
import creditCard from '../img/credit-card.svg'
import map from '../img/map.svg'
import users from '../img/users.svg'

const Account = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    photo: '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {}, []);

  const navItem = (link, text, icon, active) => (
    <li className={`${active ? `side-nav--active` : ''}`}>
      <Link to={link}>
        <img src={icon} alt='Nav Icon' />
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

  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            {navItem('#', 'Settings', settings, true)}
            {navItem('/my-tours', 'My Gear', briefcase)}
            {navItem('#', 'My reviews', starFull)}
            {navItem('#', 'Billing', creditCard)}
          </ul>
          {adminNav}
        </nav>
        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
            <form className="form form-user-data">
              <div className="form__group">
                <label className="form__label" forHtml="name">Name</label>
                <input id="name" className="form__input" type="text" value={state.name} required name="name" />
              </div>
              <div className="form__group ma-bt-md">
                <label className="form__label" forHtml="email">Email address</label>
                <input id="email" className="form__input" type="email" value={state.email} required name="email" />
              </div>
              <div className="form__group form__photo-upload">
                <img className="form__user-photo" src={`http://localhost:8000/img/users/${props.user.credentials.photo}`} alt='User profile'/>
                <input id="photo" className="form__upload" type="file" accept="image/*" name="photo" />
                <label forHtml="photo">Choose new photo</label>
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green">Save settings</button>
              </div>
            </form>
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <form className="form form-user-password">
              <div className="form__group">
                <label className="form__label" forHtml="password-current">Current password</label>
                <input id="password-current" className="form__input" type="password" placeholder="••••••••" minLength="8" required />
              </div>
              <div className="form__group">
                <label className="form__label" forHtml="password">New password</label>
                <input id="password" className="form__input" type="password" placeholder="••••••••" minLength="8" required />
              </div>
              <div className="form__group ma-bt-lg">
                <label className="form__label" forHtml="password-confirm">Confirm password</label>
                <input id="password-confirm" className="form__input" type="password" placeholder="••••••••" minLength="8" required />
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green btn--save-password">Save password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getProducts })(Account);
