import React from 'react';
// Bootstrap
// import { Navbar } from 'reactstrap';
// Styles
import '../styles/Footer.css';

const Footer = () => {
  return ( 
    <footer className='footer'>
      <div className='footer__logo'>
        <img src='/img/logo-green.png' alt='Logo'></img>
      </div>
      <div>
        <ul className='footer__nav'>
          <li><a href='/#'>About us</a></li>
          <li><a href='/#'>Download apps</a></li>
          <li><a href='/#'>Become a guide</a></li>
          <li><a href='/#'>Careers</a></li>
          <li><a href='/#'>Contact</a></li>
        </ul>
      </div>
      <p className='footer__copyright'>&copy; by Alan Fernandez. All rights reserved.</p>
    </footer>
  )
};

export default Footer;