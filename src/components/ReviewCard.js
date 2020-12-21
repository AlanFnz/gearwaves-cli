import React, { Fragment, useState, useEffect } from 'react';
// Styles
import '../styles/ReviewCard.css';
// Components
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// Icons
import starEmpty from '../img/star-empty.svg';
import starFull from '../img/star-full.svg';
import edit from '../img/edit.svg';
// Redux
import { connect } from 'react-redux';

const ReviewCard = (props) => {
  const { review } = props;
  const [state, setState] = useState({
    modal: false,
    review: '',
    rating: '',
  });

  const toggle = () => setState({ modal: !state.modal });

  useEffect(() => {
    if (!state.review && props.review.review)
      setState((prevState) => ({
        ...prevState,
        review: props.review.review,
        rating: props.review.rating,
      }));
  }, [props.review.rating, props.review.review, state.review]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

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
        <div className="reviews__edit-container" onClick={toggle}>
          <img src={edit} alt="Edit" className="reviews__edit" />
        </div>
      </div>
    ) : null;

  let ratingOptions = () => {
    const values = [1, 2, 3, 4, 5];
    return values.map(value => {
      return  <option value={value} onChange={handleChange}>{value}</option>
    })
  }
    
  let reviewEditMarkup = (
    <div>
      <Modal isOpen={state.modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>{review.product.name}</ModalHeader>
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
              <select defaultValue={state.rating} id="ratings" className="form__input">
                {ratingOptions()}
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn--small btn--green btn--save-password">
            Save review
          </button>{' '}
          <button
            className="btn btn--small btn--green btn--save-password"
            onClick={toggle}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );

  return (
    <Fragment>
      {reviewEditMarkup}
      <div
        className={`reviews__card ${props.edit ? 'reviews__card-user' : null}`}
      >
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
});

export default connect(mapStateToProps)(ReviewCard);
