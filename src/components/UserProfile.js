import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from '../axios';
// Components
import { Container, Row, Col, Spinner } from 'reactstrap';
import { showAlert } from '../util/alerts';
// Redux
import { connect } from 'react-redux';
// Actions
import { setUser } from '../redux/actions/userActions';

const UserProfile = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    photo: '',
    currentPassword: '',
    newPassword: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    setState({
      name: props.user.credentials.name,
      email: props.user.credentials.email,
      photo: null,
    });
  }, [props.user.credentials]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    console.log(id, value);
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    const photo = event.target.files[0];
    setState({ 
      ...state,
      photo
    });
  };

  const saveSettings = async (event) => {
    event.preventDefault();
    console.log(state);
    const { name, email, photo } = state;
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    if (state.photo) data.append('photo', photo, photo.name);
    try {
      const res = await axios({
        method: 'PATCH',
        url: `/users/updateMe`,
        data,
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data.status === 'success') {
        props.setUser(res.data);
        showAlert('success', `Settings updated successfully`);
        window.setTimeout(() => {
          props.history.push('/account');
        }, 1000);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  };

  return (
    <Fragment>
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
        <form className="form form-user-data">
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="form__input"
              type="text"
              value={state.name}
              required
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              className="form__input"
              type="email"
              value={state.email}
              required
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form__group form__photo-upload">
            <img
              className="form__user-photo"
              src={
                props.user.credentials.photo
                  ? `http://localhost:8000/img/users/${props.user.credentials.photo}`
                  : 'http://localhost:8000/img/users/default.jpg'
              }
              alt="User profile"
            />
            <input
              id="photo"
              className="form__upload"
              type="file"
              accept="image/*"
              name="photo"
              onChange={handlePhotoChange}
            />
            <label htmlFor="photo">Choose new photo</label>
          </div>
          <div className="form__group right">
            <button className="btn btn--small btn--green" onClick={saveSettings}>Save settings</button>
          </div>
        </form>
      </div>
      <div className="line">&nbsp;</div>
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Password change</h2>
        <form className="form form-user-password">
          <div className="form__group">
            <label className="form__label" htmlFor="password-current">
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
            <label className="form__label" htmlFor="password">
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
            <label className="form__label" htmlFor="password-confirm">
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

export default withRouter(connect(mapStateToProps, { setUser })(UserProfile));
