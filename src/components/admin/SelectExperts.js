import React, { useEffect } from 'react';
// Components
import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Table, Label, Input } from 'reactstrap';
// Redux
import { connect } from 'react-redux';
// Actions
import { getExperts } from '../../redux/actions/dataActions';

const SelectExperts = (props) => {
  const { getExperts, handle, loading } = props;

  useEffect(() => {
    if (props.data.experts.length <= 0) getExperts();
  }, [getExperts, props.data.experts]);

  let expertsMap = props.data.experts && props.data.experts.map((expert) => {
    const roleCapitalized = expert.role.charAt(0).toUpperCase() + expert.role.slice(1);
    return (
    <tr key={expert._id}>
      <td >{expert.name}</td>
      <td>{roleCapitalized}</td>
      <td style={ { textAlign: "center"} }><Label check>
          <Input data-id={expert._id} style={ { position: "relative", top: "3px", textAlign: "center" } } type="checkbox" onChange={handle} defaultChecked={props.expertsSelected && props.expertsSelected.includes(expert._id)} />{' '}
        </Label></td>
    </tr>
  )});

  let tableMarkup = <div>
  <Table className="admin__table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>Select</th>
      </tr>
    </thead>
    <tbody>
      {expertsMap}
    </tbody>
  </Table>   
  </div>

  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        centered={true}
      >
        <ModalHeader toggle={props.toggle}>Select experts</ModalHeader>
        <ModalBody>
          {tableMarkup}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn--small btn--green btn--save-password">
            Save
          </button>{' '}
          <button
            className="btn btn--small btn--red btn--save-password"
            onClick={props.toggle}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getExperts })(SelectExperts);