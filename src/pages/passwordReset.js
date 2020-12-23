import React, { useState, useEffect } from 'react';
import axios from '../axios';
// Components
import { showAlert } from '../util/alerts';
// Redux
import { connect } from 'react-redux';
// Actions
import { setUser } from '../redux/actions/userActions';

const PasswordReset = (props) => {
  const [state, setState] = useState({
    password: '', 
    passwordConfirm: '',
  });

  const { token }= props.match.params;

  useEffect(() => {
    if (props.user.authenticated || !token) props.history.push('/');
  }, [props.history, props.user.authenticated, token]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const sendReset = async (event) => {
    event.preventDefault();
    const { password, passwordConfirm } = state;
    try {
      const res = await axios({
        method: 'PATCH',
        url: `/users/resetPassword/${token}`,
        data: {
          password,
          passwordConfirm
        },
      });
      if (res.data.status === 'success') {
        showAlert('success', 'Password updated!');
        props.setUser(res.data);
        window.setTimeout(() => {
          props.history.push('/');
        }, 1500);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  };

  let bodyMarkup = 
      <form className="form form-user-password">
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
              onChange={handleChange}
              value={state.password}
            />
          </div>
          <div className="form__group ma-bt-lg">
            <label className="form__label" htmlFor="passwordConfirm">
              Confirm password
            </label>
            <input
              id="passwordConfirm"
              className="form__input"
              type="password"
              placeholder="••••••••"
              minLength="8"
              required
              onChange={handleChange}
              value={state.passwordConfirm}
            />
          </div>
          <div className="form__group right">
            <button className="btn btn--small btn--green btn--save-password" onClick={sendReset}>
              Save password
            </button>
          </div>
        </form>;

  return (
    <main className="main login">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Recover your password</h2>
        {bodyMarkup}
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { setUser })(PasswordReset);
