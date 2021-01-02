import React, { useState, useEffect } from 'react';
// Components
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { showAlert } from '../../util/alerts';
// Redux
import { connect } from 'react-redux';

const EditOrigin = (props) => {
  const { handle, toggle, origin } = props;

  const initialState = {
    description: '',
    address: '',
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

  const resetOrigin = (event) => {
    event.preventDefault();
    setState({
      description: origin.description,
      address: origin.address,
      lat: origin.coordinates[1],
      lon: origin.coordinates[0],
    });
    toggle();
  }
  
  const save = (event) => {
    event.preventDefault();
    if ( !state.address.trim() || !state.description.trim() || !state.lat.toString().trim() || !state.lon.toString().trim()  ) return showAlert('error', `All fields are required`);
    if (state.lat < -90 || state.lat > 90) return showAlert('error', `Please insert valid latitude`);
    if (state.lon < -180 || state.lon > 180) return showAlert('error', `Please insert valid longitude`);
    handle(state);
    toggle();
  }

  useEffect(() => {
    if (origin)
      setState({
        description: origin.description,
        address: origin.address,
        lat: origin.coordinates[1],
        lon: origin.coordinates[0],
      });
  }, [origin]);

  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.toggle} centered={true}>
        <ModalHeader toggle={props.toggle}>Edit Origin</ModalHeader>
        <ModalBody>
          <form className="form form-user-data">
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Address
              </label>
              <input
                id="address"
                className="form__input"
                type="text"
                value={state.address}
                required
                name="address"
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
          <button
            className="btn btn--small btn--green btn--save-password"
            onClick={save}
          >
            Save
          </button>{' '}
          <button
            className="btn btn--small btn--red btn--save-password"
            onClick={resetOrigin}
          >
            Cancel
          </button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(EditOrigin);
