import { Link } from 'react-router-dom';
import { showAlert } from './alerts';
import axios from '../axios';

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

export const truncateString = (string, number) => {
  return string.length > number
    ? `${string.substring(0, number - 1)}...`
    : string;
};

export const logout = async (event, props) => {
  event.preventDefault();
  try {
    const res = await axios ({
      method: 'GET',
      url: '/users/logout',
    });
    if (res.data.status === 'success') {
      props.logoutUser()
      window.localStorage.removeItem('gearwjwt');
      props.history.push('/');
      window.scrollTo(0, 0);
    };
  } catch(err) {
    showAlert('error', 'Error logging out! Please try again.')
  }
}