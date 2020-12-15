import React from 'react';
// Styles
import '../styles/ReviewCard.css';
// Icons
import starEmpty from '../img/star-empty.svg'
import starFull from '../img/star-full.svg'

const ReviewCard = (props) => {
  const { review } = props;

  const array = [1, 2, 3, 4, 5];
  let starsMarkup = array.map((star) => (
    review.rating >= star ? ( <img src={starFull} alt='Rating' className='reviews__star'/> ) : ( <img src={starEmpty} alt='Rating' className='reviews__star'/> ))
  )

  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img className="reviews__avatar-img" src={`http://localhost:8000/img/users/${review.user.photo}`} alt={`${review.user.name}`} />
        <h6 className="reviews__user">{review.user.name}</h6>
      </div>
      <p className="reviews__text">{review.review}</p>
      <div className="reviews__rating">
        {starsMarkup}
      </div>
    </div>
  );
};

export default ReviewCard;
