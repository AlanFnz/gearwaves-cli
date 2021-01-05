import React, { useState, Fragment } from 'react';
// Components
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Table,
  Label,
  Input,
} from 'reactstrap';
import { showAlert } from '../../util/alerts';
// Icons
import trash from '../../img/trash.svg';
import edit from '../../img/edit-black.svg';

const EditStores = (props) => {
  const { handleStoreChange, handleStoreDelete, toggle } = props;

  const initialState = {
    addEditModal: false,
    editModal: false,
    deleteModal: false,
    isNew: true,
    selected: '',
    name: '',
    description: '',
    lat: '',
    lon: '',
  }

  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const toggleAddEditModal = (event) => {
    if (event) event.preventDefault();
    setState((prevState) => ({ 
      ...prevState,
      addEditModal: !state.addEditModal,
    }));
  };

  const toggleEdit = (store, event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      isNew: false,
      nameRef: store.name,
      name: store.name,
      description: store.description,
      lat: store.coordinates[1],
      lon: store.coordinates[0],
    }));
    toggleAddEditModal();
  };

  const toggleDelete = (event, name) => {
    event.preventDefault();
    if (!name) name = '';
    setState((prevState) => ({
      ...prevState,
      selected: name,
      deleteModal: !state.deleteModal,
    }));
  };

  const localHandleDelete = (event) => {
    event.preventDefault();
    handleStoreDelete(state.selected);
    setState((prevState) => ({
      ...prevState,
      selected: '',
      deleteModal: !state.deleteModal,
    }));
  };

  const save = (event) => {
    if ( !state.name.trim() || !state.description.trim() || !state.lat.toString().trim() || !state.lon.toString().trim()  ) return showAlert('error', `All fields are required`);
    if (state.lat < -90 || state.lat > 90) return showAlert('error', `Please insert valid latitude`);
    if (state.lon < -180 || state.lon > 180) return showAlert('error', `Please insert valid longitude`);
    event.preventDefault();
    handleStoreChange(state);
    setState(initialState);
    toggleAddEditModal();
  }

  const cancelEdit = (event) => {
    event.preventDefault();
    setState(initialState);
    toggleAddEditModal();
  }

  const onKeyDown = (event) => {
    if ((event.charCode || event.keyCode) === 13) {
      event.preventDefault();
    }
  };

  let addEditStoreMarkup = (
      <div>
        <Modal isOpen={state.addEditModal} toggle={cancelEdit} centered={true}>
          <ModalHeader toggle={cancelEdit}>Add Store</ModalHeader>
          <ModalBody>
            <form className="form form-user-data" onKeyDown={onKeyDown}>
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="form__input"
                  type="text"
                  value={state.name}
                  required
                  name="name"
                  onChange={handleChange}
                  minLength={5}
                />
              </div>
              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">
                  Description
                </label>
                <input
                  id="description"
                  className="form__input"
                  type="text"
                  value={state.description}
                  required
                  name="description"
                  onChange={handleChange}
                  minLength={10}
                />
              </div>
              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">
                  Lat
                </label>
                <input
                  id="lat"
                  className="form__input"
                  type="text"
                  value={state.lat}
                  required
                  name="lat"
                  onChange={handleChange}
                />
              </div>
              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">
                  Lon
                </label>
                <input
                  id="lon"
                  className="form__input"
                  type="text"
                  value={state.lon}
                  required
                  name="lon"
                  onChange={handleChange}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn--small btn--green" onClick={save}>Save</button>{' '}
            <button className="btn btn--small btn--red" onClick={toggleAddEditModal}>
              Cancel
            </button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );

  let deleteStoreMarkup = (
    <div>
      <Modal
        isOpen={state.deleteModal}
        toggle={(event) => toggleDelete(event)}
        centered={true}
      >
        <ModalHeader toggle={(event) => toggleDelete(event)}>
          Delete Store
        </ModalHeader>
        <ModalBody style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>Are you sure? This can't be undonde</p>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn--small btn--red"
            onClick={localHandleDelete}
          >
            Delete
          </button>{' '}
          <button
            className="btn btn--small btn--green"
            onClick={(event) => toggleDelete(event)}
          >
            Cancel
          </button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );

  let storesMap =
    props.storesSelected &&
    props.storesSelected.map((store) => {
      return (
        <tr key={store.name}>
          <td>{store.name}</td>
          <td>
            <img
              className="nav__icon pointer"
              style={{ marginLeft: '6px' }}
              src={edit}
              alt="Edit Details"
              onClick={(event) => toggleEdit(store, event)}
            />
          </td>
          <td>
            <img
              className="nav__icon pointer"
              style={{ marginLeft: '10px' }}
              src={trash}
              alt="Delete Store"
              onClick={(event) => toggleDelete(event, store.name)}
            />
          </td>
        </tr>
      );
    });

  let tableMarkup = (
    <div>
      <Table className="admin__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{storesMap}</tbody>
      </Table>
    </div>
  );

  return (
    <Fragment>
      {addEditStoreMarkup}
      {deleteStoreMarkup}
      <div>
        <Modal isOpen={props.isOpen} toggle={props.toggle} centered={true}>
          <ModalHeader toggle={props.toggle}>Edit stores</ModalHeader>
          <ModalBody>{tableMarkup}</ModalBody>
          <ModalFooter>
            <button className="btn btn--small btn--green" onClick={toggleAddEditModal}>
              New
            </button>{' '}
            <button className="btn btn--small btn--green" onClick={toggle}>Done</button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    </Fragment>
  );
};

export default EditStores;
