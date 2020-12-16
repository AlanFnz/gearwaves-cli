import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Container, Row, Col, Spinner } from 'reactstrap';
// Redux
import { connect } from 'react-redux';

const UserProfile = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    photo: '',
    currentPassword: '',
    newPassword: '',
    passwordConfirm: '',
  });

  useEffect(() => {}, []);

  return (
    <Fragment>
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
        <form className="form form-user-data">
          <div className="form__group">
            <label className="form__label" forHtml="name">
              Name
            </label>
            <input
              id="name"
              className="form__input"
              type="text"
              value={state.name}
              required
              name="name"
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" forHtml="email">
              Email address
            </label>
            <input
              id="email"
              className="form__input"
              type="email"
              value={state.email}
              required
              name="email"
            />
          </div>
          <div className="form__group form__photo-upload">
            <img
              className="form__user-photo"
              src={
                props.user.credentials.photo ? (`http://localhost:8000/img/users/${props.user.credentials.photo}`) : ('http://localhost:8000/img/users/default.jpg')}
              alt="User profile"
            />
            <input
              id="photo"
              className="form__upload"
              type="file"
              accept="image/*"
              name="photo"
            />
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
            <label className="form__label" forHtml="password-current">
              Current password
            </label>
            <input
              id="password-current"
              className="form__input"
              type="password"
              placeholder="••••••••"
              minLength="8"
              required
            />
          </div>
          <div className="form__group">
            <label className="form__label" forHtml="password">
              New password
            </label>
            <input
              id="password"
              className="form__input"
              type="password"
              placeholder="••••••••"
              minLength="8"
              required
            />
          </div>
          <div className="form__group ma-bt-lg">
            <label className="form__label" forHtml="password-confirm">
              Confirm password
            </label>
            <input
              id="password-confirm"
              className="form__input"
              type="password"
              placeholder="••••••••"
              minLength="8"
              required
            />
          </div>
          <div className="form__group right">
            <button className="btn btn--small btn--green btn--save-password">
              Save password
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserProfile);
