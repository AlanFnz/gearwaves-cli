import { Link } from 'react-router-dom';

export let noContentMarkup = (role) => 
    role === 'admin' ? (
      <div className="user-view__form-container">
        <div className="cta__content">
          <h2 className="heading-secondary ma-bt-md">Anything yet</h2>
        </div>
      </div>
    ) : (
      <div className="user-view__form-container">
        <div className="cta__content">
          <h2 className="heading-secondary ma-bt-md">Anything yet :(</h2>
        </div>
        <div className="cta__content">
          <Link to="/">
            <button className="btn btn--small btn--green">Buy new gear!</button>
          </Link>
        </div>
      </div>
    );

export const calcAverageRating = (reviews, id) => {
  let count = 0;
  let totalRating = 0;
  reviews.forEach((review) => {
    if (review._id !== id ) {
      count += 1;
      totalRating = totalRating + review.rating;
    }
  })
  let averageRating = totalRating / count;
  return averageRating;
}