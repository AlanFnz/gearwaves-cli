import React from 'react';
import { Link } from 'react-router-dom'
// Icons
import store from '../img/store.svg';
import marker from '../img/marker-green.svg';

const ProductCard = (props) => {
  const { product } = props;
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay"> &nbsp;</div>
          <img className="card__picture-img" src={`${process.env.REACT_APP_API_URL}/img/products/${product.imageCover}`} alt="product name"/>
        </div>
        <h3 className="heading-tertirary"><span>{product.name}</span></h3>
      </div>
      <div className="card__details">
        <p className="card__text">{product.summary}</p>
        <div className="card__data">
          <img src={marker} alt="Rating" className="card__icon" />
          <span>{`Made in ${product.madeIn.description}`}</span>
        </div>
        <div className="card__data">
          <img src={store} alt="Rating" className="card__icon" />
          <span>{`${product.locations.length} Stores`}</span>
        </div>
      </div>
      <div className="card__footer">
        <p>
          <span className="card__footer-value">{product.price}</span>
          <span className="card__footer-text"> €</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{`Rating: ${product.ratingsAverage}`}</span>
          <span className="card__footer-text">{` (${product.ratingsQuantity})`}</span>
        </p>
        <Link className="btn btn--green btn--small" to={`/products/${product.slug}`}> Details</Link>
      </div>
    </div>
  );
};

export default ProductCard;
