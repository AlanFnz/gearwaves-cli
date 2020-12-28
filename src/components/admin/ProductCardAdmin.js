import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
// Components
import SelectExperts from './SelectExperts';
// Styles
import '../../styles/ProductCard.css';

const ProductCard = (props) => {
  const { product, cleanSelected } = props;
  const [state, setState] = useState({
    expertsModal: false,
    name: '',
    summary: '',
    description: '',
    slug: '',
    madeIn: '',
    warrantly: '',
    stock: '',
    price: '',
    imageCover: null,
    images: [],
    experts: [],
  });

  useEffect(() => {
    if (!state.name && product.name) {
      let experts = [];
      product.experts.map(expert => {
        return experts.push(expert._id)
      })
      setState((prevState) => ({
        ...prevState,
        name: product.name,
        summary: product.summary,
        description: product.description,
        slug: product.slug,
        madeIn: product.madeIn,
        warrantly: product.warrantly,
        stock: product.stock,
        price: product.price,
        experts: experts,
      }))};
  }, [
    state.name,
    product.name,
    product.summary,
    product.description,
    product.slug,
    product.madeIn,
    product.warrantly,
    product.stock,
    product.price,
    product.experts,
  ]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImageCoverChange = (event) => {
    const imageCover = event.target.files[0];
    setState({
      ...state,
      imageCover,
    });
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const images = state.images.push(image);
    setState({
      ...state,
      images,
    });
  };

  const handleCheckExperts = (event) => {
    let expertsNew = state.experts
    if (expertsNew.includes(event.target.dataset.id)) {
        let index = expertsNew.indexOf(event.target.dataset.id)
        expertsNew.splice(index, 1);
      } else {
        expertsNew.push(event.target.dataset.id)
      }
    setState({
      ...state,
      experts: expertsNew,
    });
  }

  const toggleExpertsModal = (event) => {
    event.preventDefault();
    setState({ expertsModal: !state.expertsModal });
  };

  let formFieldMarkup = (
    field,
    label,
    maxLength = null,
    minLength = null,
    type = 'text',
    handle = handleChange
  ) => {
    return (
      <div className="form__group">
        <label className="form__label" htmlFor={field}>
          {label}
        </label>
        <input
          id={field}
          className="form__input"
          type={type}
          value={state[field]}
          required
          maxLength={maxLength}
          minLength={minLength}
          name={field}
          onChange={handle}
        />
      </div>
    );
  };

  let uploadImageMarkup = (
    isImageCover,
    imageIndex,
    handle = handleImageChange
  ) => {
    const image = isImageCover
      ? product.imageCover
      : product.images[imageIndex];
    let label;
    if (isImageCover) {
      label = 'cover photo';
    } else if (imageIndex === 0) {
      label = 'photo 1';
    } else if (imageIndex === 1) {
      label = 'photo 2';
    } else if (imageIndex === 2) {
      label = 'photo 3';
    } else {
      label = 'photo';
    }

    return (
      <div className="form__group form__photo-upload form__photo-upload-product">
        <img
          className="form__user-photo"
          src={
            product.imageCover
              ? `${process.env.REACT_APP_API_URL}/img/products/${image}`
              : `${process.env.REACT_APP_API_URL}/img/products/default.png`
          }
          alt="Product"
        />
        <input
          id={isImageCover ? `imageCover` : `image`}
          className="form__upload"
          type="file"
          accept="image/*"
          name={isImageCover ? `imageCover` : `image`}
          onChange={handle}
        />
        <label htmlFor="imageCover">{`Choose ${label}`}</label>
      </div>
    );
  };

  return (
    <Fragment>
      <SelectExperts isOpen={state.expertsModal} toggle={toggleExpertsModal} expertsSelected={state.experts} handle={handleCheckExperts}/>
      <div className="card card-admin">
        <div className="user-view__form-container__product">
          <h2 className="heading-secondary ma-bt-md">Edit product</h2>
          <form className="form form-user-data">
            {formFieldMarkup('name', 'Name', 40, 10)}
            {formFieldMarkup('summary', 'Summary', 100, 10)}
            {formFieldMarkup('description', 'Description', 800, 50, 'textarea')}
            {formFieldMarkup('slug', 'Slug')}
            {formFieldMarkup('warrantly', 'Warrantly')}
            {formFieldMarkup('stock', 'Stock')}
            {formFieldMarkup('price', 'Price')}
            <div className="line">&nbsp;</div>
            <h3 className="heading-secondary heading-secondary--product-admin ma-bt-md">
              Please select a cover image and three more images
            </h3>
            {uploadImageMarkup(true, null, handleImageCoverChange)}
            {uploadImageMarkup(false, 0)}
            {uploadImageMarkup(false, 1)}
            {uploadImageMarkup(false, 2)}
            <div className="line">&nbsp;</div>
            <h3 className="heading-secondary heading-secondary--product-admin ma-bt-md">
              Specify experts, stores and origin
            </h3>
            <div className="form__group form__photo-upload form__photo-upload-product">
              <button
                id="selectExperts"
                className="form__upload"
                onClick={toggleExpertsModal}
              />
              <label htmlFor="selectExperts">Select experts</label>
            </div>
            <div className="form__group form__photo-upload form__photo-upload-product">
              <button
                className="form__upload"
                // onClick={handlePhotoChange}
              />
              <label htmlFor="imageCover">Edit stores</label>
            </div>
            <div className="form__group form__photo-upload form__photo-upload-product">
              <input
                id="origin"
                className="form__upload"
                type="file"
                accept="image/*"
                name="origin"
                // onChange={handlePhotoChange}
              />
              <label htmlFor="imageCover">Edit origin</label>
            </div>
            <div className="form__group right">
              <button className="btn btn--small btn--green">Save</button>
              <button
                className="btn btn--small btn--red btn--marginleft"
                onClick={cleanSelected}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
