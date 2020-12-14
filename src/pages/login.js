import React, { useState } from 'react';
import axios from '../axios';
// Components
import { showAlert } from '../util/alerts';
// Redux
import { connect } from 'react-redux';
// Actions
import {} from '../redux/actions/dataActions';

const Login = (props) => {
  console.log(props);

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const login = async (event) => {
    event.preventDefault();
    const { email, password } = state;
    try {
      const res = await axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email,
          password,
        },
      });

      if (res.data.status === 'success') {
        showAlert('success', 'Logged in succesfully!');
        window.setTimeout(() => {
          props.history.push('/');
        }, 1500);
      };
    } catch (err) {
      showAlert('error', err.response.data.message);
    };
  };

  return (
    <main className="main login">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form__group">
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
        <form className="form__group ma-bt-md">
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
        <form className="form__group">
          <button className="btn btn--green" onClick={login}>
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(Login);
