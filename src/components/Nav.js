import React, { Fragment } from 'react';
// Bootstrap
// import { Navbar } from 'reactstrap';
// Styles
import '../styles/Nav.css';



const Nav = () => {
  const user = false;

  const loginSignupMarkup = 
    user ? ( 
      <Fragment>
        <a className='nav__el nav__el--logout' href='/#'>Logout</a>
        <a className='nav__el' href='/me'>
          <img className='nav__user-img' src='img/users/default.jpg' alt='User' />
          <span>User name</span>
        </a>
      </Fragment>
    ) : (
      <Fragment>
        <a className='nav__el' href='/login'>Log in</a>
        <a className='nav__el nav__el--cta' href='/#'>Sign up</a>
      </Fragment>
    );

  return ( 
    <header className='header'>
      <nav className='nav nav--products'>
        <a className='nav__el' href='/'>ALL PRODUCTS</a>
      </nav>
      <div className='header__logo'>
        <img src='/img/logo-white.png' alt='logo' />
      </div>
      <nav className='nav nav--user'>
        {loginSignupMarkup}
      </nav>
    </header>
  )
};

export default Nav;