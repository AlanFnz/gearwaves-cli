import React, { useEffect } from 'react';
// Components
import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Table, Label, Input } from 'reactstrap';
import { showAlert } from '../../util/alerts';
// Redux
import { connect } from 'react-redux';
// Actions
import { getExperts } from '../../redux/actions/dataActions';

const SelectExperts = (props) => {
  const { getExperts, handle, toggle } = props;

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

  const save = (event) => {
    if (props.expertsSelected.length === 0) return showAlert('error', `Select at least one expert`);
    toggle(event, 'expertsModal');
  };

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
        toggle={(event) => toggle(event, 'expertsModal')}
        centered={true}
      >
        <ModalHeader toggle={(event) => toggle(event, 'expertsModal')}>Select experts</ModalHeader>
        <ModalBody>
          {tableMarkup}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn--small btn--green btn--save-password" onClick={save}>
            Done
          </button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getExperts })(SelectExperts);