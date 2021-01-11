import React from 'react';
// Styles
import logo from '../img/logo-grey.png';
import '../styles/Footer.css';

const Footer = () => {
  return ( 
    <footer className='footer'>
      <div className='footer__logo'>
        <img src={logo} alt='Logo'></img>
      </div>
      <div>
        <ul className='footer__nav'>
          <li><a href='/#'>Portfolio</a></li>
          <li><a href='/#'>LinkedIn</a></li>
          <li><a href='/#'>Mail</a></li>
          <li><a href='/#'>Github</a></li>
        </ul>
      </div>
      <p className='footer__copyright'>&copy; by Alan Fernandez. All rights reserved.</p>
    </footer>
  )
};

export default Footer;