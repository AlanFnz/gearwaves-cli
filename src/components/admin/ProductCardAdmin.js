import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ProductCard.css';

const ProductCard = (props) => {
  const { product, cleanSelected } = props;
  return (
    <div className="card card-admin">
      <div className="user-view__form-container__product">
        <h2 className="heading-secondary ma-bt-md">Edit product</h2>
        <form className="form form-user-data">
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="form__input"
              type="text"
              // value={state.name}
              required
              name="name"
              // onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="summary">
              Summary
            </label>
            <input
              id="summary"
              className="form__input"
              type="text"
              // value={state.email}
              required
              name="summary"
              // onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="description">
              Description
            </label>
            <input
              id="description"
              className="form__input"
              type="textarea"
              // value={state.email}
              required
              name="description"
              // onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="slug">
              Slug
            </label>
            <input
              id="slug"
              className="form__input"
              type="text"
              // value={state.email}
              required
              name="slug"
              // onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="madeIn">
              Made In
            </label>
            <input
              id="madeIn"
              className="form__input"
              type="text"
              // value={state.email}
              required
              name="madeIn"
              // onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="warrantly">
              Warrantly
            </label>
            <input
              id="warrantly"
              className="form__input"
              type="text"
              // value={state.email}
              required
              name="warrantly"
              // onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="stock">
              Stock
            </label>
            <input
              id="stock"
              className="form__input"
              type="text"
              // value={state.email}
              required
              name="stock"
              // onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              className="form__input"
              type="text"
              // value={state.email}
              required
              name="price"
              // onChange={handleChange}
            />
          </div>
          <div className="line">&nbsp;</div>
          <div className="form__group right">
            <button className="btn btn--small btn--green">Save settings</button>
            <button className="btn btn--small btn--red btn--marginleft" onClick={cleanSelected}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCard;
