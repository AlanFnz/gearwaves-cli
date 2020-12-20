import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Container, Row, Col, Spinner } from 'reactstrap';
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
    props.data.reviews.map((review, i) => <ReviewCard review={review} />);

  let reviewsDisplayMarkup = (
    <div className="user-view__form-container">
      <section className="section-reviews">
        <div className="reviews">{reviewsMarkup}</div>
      </section>
    </div>
  );

  let markup;
  if (props.data.loading) {
    markup = <Spinner size="md" color="dark" />;
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
