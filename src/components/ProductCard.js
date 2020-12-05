import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = (props) => {
  const { product } = props;
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay"> &nbsp</div>
          <img className="card__picture-img" src="#" alt="product name"/>
        </div>
        <h3 className="heading-tertirary"><span>{product.name}</span></h3>
      </div>
      <div className="card__details">
        <h4 className='card__sub-heading'>Sub heading</h4>
        <p className="card__text">{product.summary}</p>
        <div className="card__data">
          <svg className="card__icon">
            <use xlink href="img/icons.svg#icon-map-flag"></use>
          </svg>
          <span>{`Made in`}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlink href="img/icons.svg#icon-map-pin"></use>
          </svg>
          <span>Stores</span>
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
        <a className="btn btn--green btn--small" href="https://google.com"> Details</a>
      </div>
    </div>
  );
};

export default ProductCard;
