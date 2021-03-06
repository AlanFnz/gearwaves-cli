import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import axios from '../axios';
// Components
import { showAlert } from '../util/alerts';
// Reactstrap
import { Container, Row, Col } from 'reactstrap';
// Redux
import { connect } from 'react-redux';
// Actions
import { setUser, logoutUser, getUserData, loadingUser } from '../redux/actions/userActions';
// Functions
import { logout } from '../util/functions';
// Styles
import logo from '../img/logo-white.png';
import '../styles/Nav.css';

const Nav = props => {
  const { authenticated, credentials } = props.user;
  const userName = authenticated && credentials.name && credentials.name.split(' ')[0]
  const { setUser, loadingUser } = props;

  useEffect(() => {
    loadingUser(true);
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
        loadingUser(false);
        console.log(err);
      };
    }
    if(localStorage.getItem("gearwjwt") !== null) {
      getUser()
    } else { loadingUser(false) }
  }, [setUser, loadingUser])

  const loginSignupMarkup = 
    authenticated ? ( 
      <Fragment>
        <a className='nav__el nav__el--hide' href="/#" onClick={(event) => logout(event, props)}>Logout</a>
        <Link className='nav__el' to='/account'>
          <img className='nav__user-img' src={`${process.env.REACT_APP_API_URL}/img/users/${credentials.photo}`} alt='User' />
          <span className='nav__el--username d-none d-md-block'>{userName}</span>
        </Link>
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
              <Link className='nav__el' to='/'>ALL PRODUCTS</Link>
            </nav>
          </Col>
          <Col>
            <div className='header__logo'>
              <Link to='/'>
              <img src={logo} alt='logo' />
              </Link>
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

export default withRouter(connect(mapStateToProps, { setUser, logoutUser, getUserData, loadingUser })(Nav));