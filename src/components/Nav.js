import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import axios from '../axios';
// Components
import { showAlert } from '../util/alerts';
// Bootstrap
import { Container, Row, Col } from 'reactstrap';
// Redux
import { connect } from 'react-redux';
// Actions
import { setUser, logoutUser, getUserData } from '../redux/actions/userActions';
// Styles
import '../styles/Nav.css';

const Nav = props => {
  const { authenticated, credentials } = props.user;
  const userName = authenticated && credentials.name && credentials.name.split(' ')[0]
  const { setUser } = props;

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios({
          method: 'GET',
          url: '/users/logged',
        });
        if (res.data.status === 'success') {
          setUser(res.data);
        };
      } catch (err) {
        console.log(err);
      };
    }
    if(document.cookie.match(/^(.*;)?\s*jwt\s*=\s*[^;]+(.*)?$/)) getUser();
  }, [setUser])

  const logout = async (event) => {
    event.preventDefault();
    try {
      const res = await axios ({
        method: 'GET',
        url: '/users/logout',
      });
      if (res.data.status === 'success') {
        props.logoutUser()
        props.history.push('/');
      };
    } catch(err) {
      showAlert('error', 'Error logging out! Please try again.')
    }
  }

  const loginSignupMarkup = 
    authenticated ? ( 
      <Fragment>
        <a className='nav__el' href="/#" onClick={logout}>Logout</a>
        <a className='nav__el' href='/me'>
          <img className='nav__user-img' src={`http://localhost:8000/img/users/${credentials.photo}`} alt='User' />
          <span className='d-none d-md-block'>{userName}</span>
        </a>
      </Fragment>
    ) : (
      <Row xs='2' className='nav__el--signup'>
        <Col>
          <Link className='nav__el' to='/login'>Log in</Link>
        </Col>
        <Col>
          <Link className='nav__el nav__el--cta' to='/signup'>Sign up</Link>
        </Col>
      </Row>
    );

  return ( 
    <header className='header'>
      <Container>
        <Row xs='2' sm='3'>
          <Col className='d-none d-sm-block'>
            <nav className='nav nav--products'>
              <a className='nav__el' href='/'>ALL PRODUCTS</a>
            </nav>
          </Col>
          <Col>
            <div className='header__logo'>
              <img src='/img/logo-white.png' alt='logo' />
            </div>
          </Col>
          <Col>
            <nav className='nav nav--user'>
              {loginSignupMarkup}
            </nav>
          </Col>
        </Row>
      </Container>
    </header>
  )
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, { setUser, logoutUser, getUserData })(Nav));