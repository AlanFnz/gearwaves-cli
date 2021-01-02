import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
// Components
import SelectExperts from './SelectExperts';
import EditStores from './EditStores';
import EditOrigin from './EditOrigin';
import { Spinner } from 'reactstrap';
import { showAlert } from '../../util/alerts';
// Redux
import { connect } from 'react-redux';
// Actions
import { updateProduct } from '../../redux/actions/dataActions';
// Styles
import '../../styles/ProductCard.css';
import axios from '../../axios';

const ProductCard = (props) => {
  const { cleanSelected, updateProduct } = props;

  const initialState = {
    isNew: true,
    expertsModal: false,
    storesModal: false,
    originModal: false,
    fetched: false,
    newImageCover: null,
    newImageLeft: null,
    newImageCenter: null,
    newImageRight: null,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (props.data.product) {
      let experts = [];
      props.data.product.experts.map((expert) => {
        return experts.push(expert._id);
      });
      setState((prevState) => ({
        ...prevState,
        isNew: false,
        name: props.data.product.name,
        summary: props.data.product.summary,
        description: props.data.product.description,
        slug: props.data.product.slug,
        madeIn: props.data.product.madeIn,
        warrantly: props.data.product.warrantly,
        stock: props.data.product.stock,
        price: props.data.product.price,
        imageLeft: props.data.product.imageLeft,
        imageCenter: props.data.product.imageCenter,
        imageRight: props.data.product.imageRight,
        imageCover: props.data.product.imageCover,
        experts: experts,
        locations: props.data.product.locations,
      }));
    }
  }, [props.productSlug, props.data.product]);

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setState((prevState) => ({
      ...prevState,
      [event.target.id]: image,
    }));
  };

  const handleCheckExperts = (event) => {
    let expertsNew = state.experts;
    if (expertsNew.includes(event.target.dataset.id)) {
      let index = expertsNew.indexOf(event.target.dataset.id);
      expertsNew.splice(index, 1);
    } else {
      expertsNew.push(event.target.dataset.id);
    }
    setState((prevState) => ({
      ...prevState,
      experts: expertsNew,
    }));
  };

  const handleStoreDelete = (name) => {
    let newLocations = state.locations;
    const removeIndex = newLocations
      .map(function (item) {
        return item.name;
      })
      .indexOf(name);
    newLocations.splice(removeIndex, 1);
    setState((prevState) => ({
      ...prevState,
      locations: newLocations,
    }));
  };

  const handleStoreChange = (data) => {
    let newLocations = state.locations;

    // If not new entry, delete the old one
    if (data.isNew === false) {
      const removeIndex = newLocations
        .map(function (item) {
          return item.name;
        })
        .indexOf(data.nameRef);
      newLocations.splice(removeIndex, 1);
    }

    // Set new location
    let newLocation = {
      type: 'Point',
      coordinates: [Number(data.lon), Number(data.lat)],
      name: data.name,
      description: data.description,
    };

    // Push it into the array
    newLocations.push(newLocation);

    setState((prevState) => ({
      ...prevState,
      locations: newLocations,
    }));
  };

  const handleOriginSave = (data) => {
    setState((prevState) => ({
      ...prevState,
      madeIn: {
        type: 'Point',
        description: data.description,
        coordinates: [Number(data.lon), Number(data.lat)],
        address: data.address,
      },
    }));
  };

  const toggleExpertsModal = (event) => {
    if (event) event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      expertsModal: !state.expertsModal,
    }));
  };

  const toggleStoresModal = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      storesModal: !state.storesModal,
    }));
  };

  const toggleOriginModal = (event) => {
    if (event) event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      originModal: !state.originModal,
    }));
  };

  const saveImages = async () => {
    const data = new FormData();

    const imagesIndex = [
      'newImageCover',
      'newImageLeft',
      'newImageCenter',
      'newImageRight',
    ];
    imagesIndex.forEach((index) => {
      const nameSplit = index.split('new')[1];
      const name = nameSplit.charAt(0).toLowerCase() + nameSplit.slice(1);
      if (state[index]) data.append(name, state[index], state[index].name);
    });

    const res = await axios({
      method: 'PATCH',
      url: `/products/${props.data.product._id}`,
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (res.data.status === 'success') {
      return true;
    }
  };

  const saveData = async () => {
    const data = {
      description: state.description,
      name: state.name,
      summary: state.summary,
      price: state.price,
      slug: state.slug,
      stock: state.stock,
      warrantly: state.warrantly,
      madeIn: state.madeIn,
      experts: state.experts,
      locations: state.locations,
    };

    const res = await axios({
      method: 'PATCH',
      url: `/products/${props.data.product._id}`,
      data,
    });
    if (res.data.status === 'success') {
      return true;
    }
  };

  const save = async (event) => {
    event.preventDefault();
    // Validation
    if (state.isNew && state.newImageCover === null)
      return showAlert('error', `Select a cover image`);
    if (state.isNew && state.newImages.length < 3)
      return showAlert('error', `Three product images besides the cover image`);
    if (
      !state.name.trim() ||
      !state.price.toString().trim() ||
      !state.slug.trim() ||
      !state.stock.toString().trim() ||
      !state.description.trim() ||
      !state.summary.trim() ||
      !state.warrantly.toString().trim()
    )
      showAlert('error', `All fields are required. No empty spaces.`);
    if (state.experts.length === 0)
      return showAlert('error', `Select at least one expert`);
    if (state.locations.length === 0)
      return showAlert('error', `Select at least one store`);
    if (Object.keys(state.madeIn).length === 0)
      return showAlert('error', `Set the product origin`);

    // Update
    try {
      let saveDataResult = await saveData();
      let saveImagesResult

      if (
        state.newImageCover ||
        state.newImageLeft ||
        state.newImageCenter ||
        state.newImageRight
      ) {
        saveImagesResult = await saveImages();
      } else {
        saveImagesResult = true
      }

      if (saveDataResult && saveImagesResult) {
        showAlert('success', `Product updated successfully`);
        window.setTimeout(() => {
          cleanSelected();
        }, 1500);
      } else {
        showAlert('error', `Something went wrong! :(`);
      }
    } catch (err) {
      showAlert('error', `Something went wrong! :(`);
      console.log(err);
    }
  };

  const clean = async (event) => {
    event.preventDefault();
    cleanSelected();
  };

  let formFieldMarkup = (
    field,
    label,
    maxLength = null,
    minLength = null,
    type = 'text',
    handle = handleFormChange
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

  let uploadImageMarkup = (actual, imageId, name) => {
    const image = props.data.product[actual];
    const label = `${name} image`;

    return (
      <div className="form__group form__photo-upload form__photo-upload-product">
        <img
          className="form__user-photo"
          src={
            props.data.product[actual]
              ? `${process.env.REACT_APP_API_URL}/img/products/${image}`
              : `${process.env.REACT_APP_API_URL}/img/products/default.png`
          }
          alt="Product"
        />
        <input
          id={imageId}
          className="form__upload"
          type="file"
          accept="image/*"
          name={name}
          onChange={handleImageChange}
        />
        <label htmlFor={imageId}>{`Choose ${label}`}</label>
      </div>
    );
  };

  return props.data.loading ? (
    <Spinner size="md" color="dark" />
  ) : (
    <Fragment>
      <SelectExperts
        isOpen={state.expertsModal}
        toggle={toggleExpertsModal}
        expertsSelected={state.experts}
        handle={handleCheckExperts}
      />
      <EditStores
        isOpen={state.storesModal}
        toggle={toggleStoresModal}
        storesSelected={state.locations}
        handleStoreChange={handleStoreChange}
        handleStoreDelete={handleStoreDelete}
      />
      <EditOrigin
        isOpen={state.originModal}
        toggle={toggleOriginModal}
        origin={state.madeIn}
        handle={handleOriginSave}
      />
      <div className="card card-admin">
        <div className="user-view__form-container__product">
          <h2 className="heading-secondary ma-bt-md">Edit product</h2>
          <form className="form form-user-data" onSubmit={save}>
            {formFieldMarkup('name', 'Name', 40, 10)}
            {formFieldMarkup('summary', 'Summary', 100, 10)}
            {formFieldMarkup('description', 'Description', 800, 50, 'textarea')}
            {formFieldMarkup('slug', 'Slug', 50, 5)}
            {formFieldMarkup('warrantly', 'Warrantly', null, null, 'number')}
            {formFieldMarkup('stock', 'Stock', null, null, 'number')}
            {formFieldMarkup('price', 'Price', null, null, 'number')}
            <div className="line">&nbsp;</div>
            <h3 className="heading-secondary heading-secondary--product-admin ma-bt-md">
              Please select a cover image and three more images
            </h3>
            {uploadImageMarkup('imageCover', 'newImageCover', 'cover')}
            {uploadImageMarkup('imageLeft', 'newImageLeft', 'left')}
            {uploadImageMarkup('imageCenter', 'newImageCenter', 'center')}
            {uploadImageMarkup('imageRight', 'newImageRight', 'right')}
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
                id="editStores"
                className="form__upload"
                onClick={toggleStoresModal}
              />
              <label htmlFor="editStores">Edit stores</label>
            </div>
            <div className="form__group form__photo-upload form__photo-upload-product">
              <button
                id="editOrigin"
                className="form__upload"
                onClick={toggleOriginModal}
              />
              <label htmlFor="editOrigin">Edit origin</label>
            </div>
            <div className="form__group right">
              <button type="submit" className="btn btn--small btn--green">
                Save
              </button>
              <button
                className="btn btn--small btn--red btn--marginleft"
                onClick={clean}
              >
                Cancel
              </button>
              <button
                className="btn btn--small btn--red btn--marginleft"
                onClick={(event) => {
                  event.preventDefault();
                  console.log(state);
                }}
              >
                Log
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { updateProduct })(ProductCard);
