import React, { useState, useEffect } from 'react';
import axios from '../axios';
// Components
import { showAlert } from '../util/alerts';
// Redux
import { connect } from 'react-redux';
// Actions
import { setUser } from '../redux/actions/userActions';

const Signup = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    if (props.user.authenticated) props.history.push('/');
  }, [props.history, props.user.authenticated]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const signup = async (event) => {
    event.preventDefault();
    const { name, email, password, passwordConfirm } = state;
    if (!name || !email || !password || !passwordConfirm) return showAlert('error', 'Please, complete all the fields');
    try {
      const res = await axios({
        method: 'POST',
        url: '/users/signup',
        data: {
          name,
          email,
          password,
          passwordConfirm,
        },
      });

      if (res.data.status === 'success') {
        props.setUser(res.data);
        showAlert('success', 'Account created succesfully!');
        window.setTimeout(() => {
          props.history.push('/');
        }, 1500);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  };

  const onKeyDown = (event) => {
    if ((event.charCode || event.keyCode) === 13) {
      event.preventDefault();
      signup(event);
    }
  }

  return (
    <main className="main login">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create your account</h2>
        <form className="form__group" onKeyDown={onKeyDown}>
          <label className="form__label" htmlFor="name">
            Name
          </label>
          <input
            className="form__input"
            id="name"
            type="text"
            placeholder="John Doe"
            value={state.name}
            onChange={handleChange}
            required
            minLength="3"
            maxLength="40"
          />
        </form>
        <form className="form__group ma-bt-md" onKeyDown={onKeyDown}>
          <label className="form__label" htmlFor="email">
            Email address
          </label>
          <input
            className="form__input"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={state.email}
            onChange={handleChange}
            required
          />
        </form>
        <form className="form__group ma-bt-md" onKeyDown={onKeyDown}>
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
            id="password"
            type="password"
            placeholder="••••••••"
            value={state.password}
            onChange={handleChange}
            required
            minLength="8"
          />
        </form>
        <form className="form__group ma-bt-md" onKeyDown={onKeyDown}>
          <label className="form__label" htmlFor="passwordConfirm">
            Confirm your password
          </label>
          <input
            className="form__input"
            id="passwordConfirm"
            type="password"
            placeholder="••••••••"
            value={state.passwordConfirm}
            onChange={handleChange}
            required
            minLength="8"
          />
        </form>
        <form className="form__group" onKeyDown={onKeyDown}>
          <button className="btn btn--green" onClick={signup}>
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { setUser })(Signup);
