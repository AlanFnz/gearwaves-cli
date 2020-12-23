import React, { useState, useEffect, Fragment } from 'react';
import axios from '../axios';
// Components
import { showAlert } from '../util/alerts';
// Redux
import { connect } from 'react-redux';
// Actions
import { setUser } from '../redux/actions/userActions';

const PasswordRecovery = (props) => {
  const [state, setState] = useState({
    email: '',
    sent: false,
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

  const sendRecover = async (event) => {
    event.preventDefault();
    const { email } = state;
    try {
      const res = await axios({
        method: 'POST',
        url: '/users/forgotPassword',
        data: {
          email,
        },
      });

      if (res.data.status === 'success') {
        setState({ sent: true })
        showAlert('success', 'Mail sent succesfully!');
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  };

  let bodyMarkup = state.sent ? (
    <p className='forgotPassword'>
      Check the link in your email. Remember, it has a duration of 10 minutes!
    </p>
  ) : (
    <Fragment>
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
      <form className="form__group">
        <button className="btn btn--green" onClick={sendRecover}>
          Send link
        </button>
      </form>
    </Fragment>
  );

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

export default connect(mapStateToProps, { setUser })(PasswordRecovery);
