import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Container, Row, Col, Spinner, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReviewCard from './ReviewCard';
// Redux
import { connect } from 'react-redux';
// Actions
import { getByUser } from '../redux/actions/dataActions';

const MyReviews = (props) => {
  const { getByUser } = props;
  const userId = props.user.credentials._id;

  useEffect(() => {
    getByUser(userId, 'reviews');
  }, [getByUser, userId]);

  let noReviewsMarkup = (
    <div className="user-view__form-container">
      <Row className="cta__content">
        <h2 className="heading-secondary ma-bt-md">Anything yet :(</h2>
      </Row>
      <Row className="cta__content">
        <Link to="/">
          <button className="btn btn--small btn--green">Buy new gear!</button>
        </Link>
      </Row>
    </div>
  );

  const reviewsMarkup =
    props.data.reviews &&
    props.data.reviews.map((review, i) => review.user._id === props.user.credentials._id ? (<ReviewCard review={review} edit={true}/>) : (null));

  let reviewsDisplayMarkup = (
    <div className="user-view__form-container user-view__form-container__reviews">
      <h2 className="heading-secondary ma-bt-md">Reviews made by you</h2>
      <section className="section-reviews__user">
        <div className="reviews__by-user">{reviewsMarkup}</div>
      </section>
    </div>
  );

  let markup;
  if (props.data.loading) {
    markup = <div className="user-view__form-container"><Spinner size="md" color="dark" /></div>;
  } else if (props.data.reviews.length <= 0) {
    markup = noReviewsMarkup;
  } else {
    markup = reviewsDisplayMarkup;
  }

  return <Container>{markup}</Container>;
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { getByUser })(MyReviews);
