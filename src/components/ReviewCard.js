import React, { Fragment, useState } from 'react';
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
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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
          <img src={edit} alt="Edit" className="reviews__edit"  />
        </div>
      </div>
    ) : null;

  let reviewEditMarkup = (
    <div>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <button className="btn btn--small btn--green btn--save-password">
            Save review
          </button>{' '}
          <button className="btn btn--small btn--green btn--save-password">
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );

  return (
    <Fragment>
      {reviewEditMarkup}
      <div className="reviews__card">
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
        {props.edit ? (<p className="reviews__product-name">{review.product.name}</p>) : (null)}
        <div className="reviews__rating">{starsMarkup}</div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ReviewCard);
