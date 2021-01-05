import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Container, Row, Col, Spinner } from 'reactstrap';
import UserProfile from '../components/UserProfile';
import MyGear from '../components/MyGear';
import MyReviews from '../components/MyReviews';
import ProductsAdmin from '../components/admin/ProductsAdmin';
import UsersAdmin from '../components/admin/UsersAdmin';
// Redux
import { connect } from 'react-redux';
// Icons
import settings from '../img/settings.svg';
import briefcase from '../img/briefcase.svg';
import money from '../img/money.svg';
import product from '../img/product.svg';
import starFull from '../img/star-full-white.svg';
import users from '../img/users.svg';

const Account = (props) => {
  const haveToken = document.cookie.match(/^(.*;)?\s*jwt\s*=\s*[^;]+(.*)?$/);

  useEffect(() => {
    !haveToken && !props.user.authenticated && props.history.push('/');
  }, [props.history, props.user.authenticated, haveToken]);

  const navItem = (link, text, icon, active) => (
    <li className={`${active ? `side-nav--active` : ''}`}>
      <Link to={link}>
        <img className="nav__icon" src={icon} alt="Nav Icon" />
        {text}
      </Link>
    </li>
  );

  const adminNav =
    props.user.credentials.role === 'admin' ? (
      <div className="admin-nav">
        <h5 className="admin-nav__heading">Admin</h5>
        <ul className="side-nav">
          {navItem(
                  '/account/products',
                  'Products',
                  product,
                  props.match.params.section === 'products' ? true : false
                )}
          {navItem(
                  '/account/users',
                  'Users',
                  users,
                  props.match.params.section === 'users' ? true : false
                )}
          {navItem(
                  '/account/reviews',
                  'Reviews',
                  starFull,
                  props.match.params.section === 'reviews' ? true : false
                )}
          {navItem(
                  '/account/sales',
                  'Sales',
                  money,
                  props.match.params.section === 'sales' ? true : false
                )}
        </ul>
      </div>
    ) : null;

  const pageRender = () => {
    switch (props.match.params.section) {
      case 'settings':
        return <UserProfile />;
      case 'myGear':
        return <MyGear />;
      case 'myReviews':
        return <MyReviews />;
      case 'products':
        if(props.user.credentials.role !== 'admin'){
          return <UserProfile />;
        } else { 
          return <ProductsAdmin />;
        }
      case 'users':
        if(props.user.credentials.role !== 'admin'){
          return <UserProfile />;
        } else { 
          return <UsersAdmin />;
        }
      default:
        return <UserProfile />;
    }
  };

  return (
    <main className="main main-account">
      <Container className="user-view">
        <Row className="user-view__row">
          <Col md="3" xs="12" className={`user-view__menu ${props.user.credentials.role === 'admin' ? 'user-view__menu-admin' : null}`}>
            <nav >
              <ul className="side-nav">
                {navItem(
                  '/account/settings',
                  'Settings',
                  settings,
                  props.match.params.section === 'settings'
                    ? true
                    : !props.match.params.section
                    ? true
                    : false
                )}
                {navItem(
                  '/account/myGear',
                  'My Gear',
                  briefcase,
                  props.match.params.section === 'myGear' ? true : false
                )}
                {navItem(
                  '/account/myReviews',
                  'My reviews',
                  starFull,
                  props.match.params.section === 'myReviews' ? true : false
                )}
              </ul>
              {adminNav}
            </nav>
          </Col>
          <Col md="9" xs="12" className="user-view__content">{pageRender()}</Col>
        </Row>
      </Container>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Account);
