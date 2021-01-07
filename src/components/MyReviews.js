import React, { useEffect } from 'react';
// Components
import { Container, Spinner } from 'reactstrap';
import ReviewCard from './ReviewCard';
// Redux
import { connect } from 'react-redux';
// Actions
import { getByUser } from '../redux/actions/dataActions';
// Functions
import { noContentMarkup } from '../util/functions';

const MyReviews = (props) => {
  const { getByUser } = props;
  const userId = props.user.credentials._id;

  useEffect(() => {
    getByUser(userId, 'reviews');
  }, [getByUser, userId]);

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
    markup = <div className="spinner--container"><Spinner className="spinner" size="md" color="dark" /></div>;
  } else if (props.data.reviews.length <= 0) {
    markup = noContentMarkup(props.user.credentials.role);
  } else {
    markup = reviewsDisplayMarkup;
  }

  return <Container className="user-view__form-reviews">{markup}</Container>;
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { getByUser })(MyReviews);
