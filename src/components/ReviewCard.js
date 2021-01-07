import React, { Fragment, useState, useEffect } from 'react';
import axios from '../axios';
// Styles
import '../styles/ReviewCard.css';
// Components
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { showAlert } from '../util/alerts';
// Icons
import starEmpty from '../img/star-empty.svg';
import starFull from '../img/star-full.svg';
import edit from '../img/edit.svg';
import trash from '../img/trash-white.svg';
// Functions
import { calcAverageRating } from '../util/functions';
// Redux
import { connect } from 'react-redux';
// Actions
import { updateReview, deleteReview, getProducts } from '../redux/actions/dataActions';

const ReviewCard = (props) => {
  const { review } = props;
  const [state, setState] = useState({
    editModal: false,
    deleteModal: false,
    review: '',
    rating: '',
  });

  const clearState = () => setState({
    editModal: false, 
    deleteModal: false, 
    review: '', 
    rating: ''
  })

  useEffect(() => {
    if (!state.review && props.review.review)
      setState((prevState) => ({
        ...prevState,
        review: props.review.review,
        rating: props.review.rating,
      }));
  }, [props.review.rating, props.review.review, state.review]);

  const toggle = (event, modal) => {
    if (event) event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      [modal]: !state[modal],
    }));
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    const { rating } = state;
    const rvw = state.review;
    if (rvw.length < 10) return showAlert('error', 'A review must have at least 10 characters');
    try {
      const res = await axios({
        method: 'PATCH',
        url: `/reviews/${review._id}`,
        data: {
          'review': rvw,
          'rating': rating
        }
      });
      if (res.data.status === 'success') {
        props.updateReview(res.data);
        showAlert('success', 'Review updated succesfully!');
        clearState();
      };
    } catch (err) {
      showAlert('error', 'Something went wrong! :(');
      console.log(err);
    };
  };

  const handleDelete = async (event) => {
    if (event) event.preventDefault();
    try {
      const resDelete = await axios({
        method: 'DELETE',
        url: `/reviews/${review._id}`,
      });
      if (resDelete.status === 204) {
        let ratingsQuantity = props.data.product.ratingsQuantity - 1;
        let ratingsAverage = calcAverageRating(props.data.reviews, review._id);
        const resUpdateCount = await axios({
          method: 'PATCH',
          url: `/products/${props.data.product._id}`,
          data: {
            ratingsAverage,
            ratingsQuantity,
          }
        });
        if (resUpdateCount.data.status === 'success') {
          props.deleteReview(review._id);
          showAlert('success', 'Review deleted succesfully');
          props.getProducts();
          clearState();
        } else {
          showAlert('error', 'Something went wrong! :(');
        };
      } else {
        showAlert('error', 'Something went wrong! :(');
      };
    } catch (err) {
      console.log(err);
    };
  }

  const array = [1, 2, 3, 4, 5];
  let starsMarkup = array.map((star) =>
    review.rating >= star ? (
      <img src={starFull} alt="Rating" className="reviews__star" />
    ) : (
      <img src={starEmpty} alt="Rating" className="reviews__star" />
    )
  );

  let editButton =
    review.user._id === props.user.credentials._id && props.edit ? (
      <div className="reviews__edit-position">
        <div className="reviews__edit-container" onClick={(event) => toggle(event, 'editModal')}>
          <img src={edit} alt="Edit" className="reviews__edit" />
        </div>
      </div>
    ) : null;

  let deleteButton =
    props.user.credentials.role === 'admin' && props.delete ? (
      <div className="reviews__edit-position">
        <div className="reviews__edit-container" onClick={(event) => toggle(event, 'deleteModal')}>
          <img src={trash} alt="Edit" className="reviews__edit" />
        </div>
      </div>
    ) : null;

  let ratingOptions = () => {
    const values = [1, 2, 3, 4, 5];
    return values.map(value => {
      return  <option value={value}>{value}</option>
    })
  }
    
  let reviewEditMarkup = (
    <div>
      <Modal isOpen={state.editModal} toggle={(event) => toggle('editModal')} centered={true}>
        <ModalHeader toggle={(event) => toggle('editModal')}>{review.product.name}</ModalHeader>
        <ModalBody>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Review
            </label>
            <textarea
              id="review"
              className="form__input form__input-textarea"
              type="text"
              value={state.review}
              required
              name="name"
              maxLength={160}
              minLength={10}
              onChange={handleChange}
            />
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="email">
                Rating
              </label>
              <select defaultValue={state.rating} id="rating" className="form__input"  onChange={handleChange} required>
                {ratingOptions()}
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn--small btn--green btn--save-password" onClick={handleSubmit}>
            Save review
          </button>{' '}
          <button
            className="btn btn--small btn--green btn--save-password"
            onClick={(event) => toggle('editModal')}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );

  let deleteReviewMarkup = (
    <div>
      <Modal isOpen={state.deleteModal} toggle={(event) => toggle(event, 'deleteModal')} centered={true}>
        <ModalHeader toggle={(event) => toggle(event, 'deleteModal')}>Delete User</ModalHeader>
        <ModalBody style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>
            Are you sure? This can't be undonde
          </p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn--small btn--red" onClick={handleDelete}>
            Delete
          </button>{' '}
          <button className="btn btn--small btn--green" onClick={(event) => toggle(event, 'deleteModal')}>
            Cancel
          </button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );

  return (
    <Fragment>
      {reviewEditMarkup}
      {deleteReviewMarkup}
      <div
        className={`reviews__card ${props.edit || props.delete ? 'reviews__card-user' : null}`}
        >
        {deleteButton}
        {editButton}
        <div className="reviews__avatar">
          <img
            className="reviews__avatar-img"
            src={`${process.env.REACT_APP_API_URL}/img/users/${review.user.photo}`}
            alt={`${review.user.name}`}
          />
          <h6 className="reviews__user">{review.user.name}</h6>
        </div>
        <p className="reviews__text">{review.review}</p>
        {props.edit ? (
          <p className="reviews__product-name">{review.product.name}</p>
        ) : null}
        <div className="reviews__rating">{starsMarkup}</div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { updateReview, deleteReview, getProducts })(ReviewCard);
