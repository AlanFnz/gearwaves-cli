import React, { Fragment } from 'react';
// Bootstrap
// import { Navbar } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
// Styles
import '../styles/Nav.css';

const Nav = () => {
  const user = false;

  const loginSignupMarkup = 
    user ? ( 
      <Fragment>
        <a className='nav__el' href='/#'>Logout</a>
        <a className='nav__el' href='/me'>
          <img className='nav__user-img d-none d-sm-block' src='img/users/default.jpg' alt='User' />
          <span className='d-none d-md-block'>User name</span>
        </a>
      </Fragment>
    ) : (
      <Row xs='2' className='nav__el--signup'>
        <Col>
          <a className='nav__el' href='/login'>Log in</a>
        </Col>
        <Col>
          <a className='nav__el nav__el--cta' href='/#'>Sign up</a>
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

export default Nav;