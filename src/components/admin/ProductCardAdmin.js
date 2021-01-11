import React, { useState, useEffect, Fragment } from 'react';
import axios from '../../axios';
// Components
import SelectExperts from './SelectExperts';
import EditStores from './EditStores';
import EditOrigin from './EditOrigin';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';
import { showAlert } from '../../util/alerts';
// Redux
import { connect } from 'react-redux';
// Actions
import { updateProducts, deleteProduct } from '../../redux/actions/dataActions';
// icons
import trash from '../../img/trash-white.svg';

const ProductCard = (props) => {
  const { cleanSelected, updateProducts, deleteProduct } = props;

  const initialState = {
    isNew: true,
    expertsModal: false,
    storesModal: false,
    originModal: false,
    deleteModal: false,
    fetched: false,
    newImageCover: null,
    newImageLeft: null,
    newImageCenter: null,
    newImageRight: null,
    experts: [],
    locations: [],
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (Object.keys(props.data.product).length > 0) {
      let experts = [];
      props.data.product.experts.map((expert) => {
        return experts.push(expert._id);
      });
      setState((prevState) => ({
        ...prevState,
        isNew: false,
        id: props.data.product._id,
        name: props.data.product.name,
        summary: props.data.product.summary,
        description: props.data.product.description,
        slug: props.data.product.slug,
        madeIn: props.data.product.madeIn,
        warranty: props.data.product.warranty,
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

  const toggle = (event, modal) => {
    if (event) event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      [modal]: !state[modal],
    }));
  };

  const saveImages = async (id) => {
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
      url: `/products/${state.id || id}`,
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (res.data.status === 'success') {
      updateProducts(res.data.data.data);
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
      warranty: state.warranty,
      madeIn: state.madeIn,
      experts: state.experts,
      locations: state.locations,
    };

    if (state.isNew) {
      const res = await axios({
        method: 'POST',
        url: `/products/`,
        data,
      });
      if (res.data.status === 'success') {
        return res.data.data.data._id;
      }
    } else {
      const res = await axios({
        method: 'PATCH',
        url: `/products/${state.id}`,
        data,
      });
      if (res.data.status === 'success') {
        updateProducts(res.data.data.data);
        return true;
      }
    }
  };

  const save = async (event) => {
    event.preventDefault();
    // Validation
    if (state.isNew && state.newImageCover === null)
      return showAlert('error', `Select a cover image`);
    if (state.isNew)
      if (
        state.newImageLeft === null ||
        state.newImageCenter === null ||
        state.newImageRight === null
      )
        return showAlert(
          'error',
          `Select three product images besides the cover image`
        );
    if (
      !state.name.trim() ||
      !state.price.toString().trim() ||
      !state.slug.trim() ||
      !state.stock.toString().trim() ||
      !state.description.trim() ||
      !state.summary.trim() ||
      !state.warranty.toString().trim()
    )
      showAlert('error', `All fields are required. No empty spaces.`);
    if (!state.experts || state.experts.length === 0)
      return showAlert('error', `Select at least one expert`);
    if (state.locations.length === 0)
      return showAlert('error', `Select at least one store`);
    if (Object.keys(state.madeIn).length === 0)
      return showAlert('error', `Set the product origin`);

    // Update
    try {
      let saveDataResult = await saveData();
      let saveImagesResult;

      if (
        state.newImageCover ||
        state.newImageLeft ||
        state.newImageCenter ||
        state.newImageRight
      ) {
        saveImagesResult = await saveImages(saveDataResult);
      } else {
        saveImagesResult = true;
      }

      if (saveDataResult && saveImagesResult) {
        state.isNew
          ? showAlert('success', `Product created successfully`)
          : showAlert('success', `Product updated successfully`);
        window.setTimeout(() => {
          cleanSelected();
          window.scrollTo(0, 50);
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
    window.scrollTo(0, 50);
  };

  const deleteAction = async () => {
    try {
      const res = await axios({
        method: 'DELETE',
        url: `/products/${state.id}`,
      });
      if (res.status === 204) {
        showAlert('success', `Product deleted successfully`)
        deleteProduct(props.data.product._id);
        toggle(null, 'deleteModal');
        window.setTimeout(() => {
          cleanSelected();
          window.scrollTo(0, 50);
        }, 1500);
      }
    } catch(err) {
      toggle(null, 'deleteModal');
      showAlert('error', `Something went wrong! :(`);
      console.log(err);
    }
  }

  let formFieldMarkup = (
    field,
    label,
    maxLength = null,
    minLength = null,
    type = 'text',
    handle = handleFormChange
  ) => {
    const Tag = type === 'textarea' ? 'textarea' : 'input';
    const height = type === 'textarea' ? { height: '150px', wordWrap: 'break-word' }  : null;
    return (
      <div className="form__group">
        <label className="form__label" htmlFor={field}>
          {label}
        </label>
        <Tag
          id={field}
          className="form__input"
          type={type}
          value={state[field]}
          required
          maxLength={maxLength}
          minLength={minLength}
          name={field}
          onChange={handle}
          style={height}

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

  let deleteDialog = (
    <Modal
      isOpen={state.deleteModal}
      toggle={(event) => toggle(event, 'deleteModal')}
      centered={true}
    >
      <ModalHeader toggle={props.toggle}>Delete Product</ModalHeader>
      <ModalBody style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '1.5rem' }}>
          Are you sure you want to delete this product?
        </p>
        <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>This action can't be
          undone</p>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn--small btn--red btn--save-password"
          onClick={deleteAction}
        >
          Delete
        </button>{' '}
        <button
          className="btn btn--small btn--green btn--save-password"
          onClick={(event) => toggle(event, 'deleteModal')}
        >
          Cancel
        </button>{' '}
      </ModalFooter>
    </Modal>
  );

  return props.data.loading ? (
    <div className="spinner-container"><Spinner className="spinner" size="md" color="dark" /></div>
  ) : (
    <Fragment>
      <SelectExperts
        isOpen={state.expertsModal}
        toggle={toggle}
        expertsSelected={state.experts}
        handle={handleCheckExperts}
      />
      <EditStores
        isOpen={state.storesModal}
        toggle={toggle}
        storesSelected={state.locations}
        handleStoreChange={handleStoreChange}
        handleStoreDelete={handleStoreDelete}
      />
      <EditOrigin
        isOpen={state.originModal}
        toggle={toggle}
        origin={state.madeIn}
        handle={handleOriginSave}
      />
      {deleteDialog}
      <div className="card card-admin">
        <div className="admin__delete-position">
          <div
            className="admin__delete-container"
            onClick={(event) => toggle(event, 'deleteModal')}
          >
            <img src={trash} alt="Delete product" className="admin__delete" />
          </div>
        </div>
        <div className="user-view__form-container__product">
          <h2 className="heading-secondary ma-bt-md">Edit product</h2>
          <form className="form form-user-data" onSubmit={save}>
            {formFieldMarkup('name', 'Name', 40, 10)}
            {formFieldMarkup('summary', 'Summary', 100, 10)}
            {formFieldMarkup('description', 'Description', 800, 50, 'textarea')}
            {formFieldMarkup('slug', 'Slug', 50, 5)}
            {formFieldMarkup('warranty', 'Warranty', null, null, 'number')}
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
                onClick={(event) => toggle(event, 'expertsModal')}
              />
              <label htmlFor="selectExperts">Select experts</label>
            </div>
            <div className="form__group form__photo-upload form__photo-upload-product">
              <button
                id="editStores"
                className="form__upload"
                onClick={(event) => toggle(event, 'storesModal')}
              />
              <label htmlFor="editStores">Edit stores</label>
            </div>
            <div className="form__group form__photo-upload form__photo-upload-product">
              <button
                id="editOrigin"
                className="form__upload"
                onClick={(event) => toggle(event, 'originModal')}
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
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, { updateProducts, deleteProduct })(ProductCard);
