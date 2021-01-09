import React, { useState, useEffect } from 'react';
// Components
import {
  Container,
  Spinner,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
// Redux
import { connect } from 'react-redux';
// Actions
import { getSales } from '../../redux/actions/dataActions';
// Functions
import { noContentMarkup, truncateString } from '../../util/functions';

const Sales = (props) => {
  const { getSales } = props;

  const initialState = {
    detailsModal: false,
    userName: '',
    userEmail: '',
    userRole: '',
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (!props.data.fetchedSales) getSales();
  }, [props.data.fetchedSales, getSales]);

  const toggleDetailsModal = () => {
    setState((prevState) => ({
      ...prevState,
      detailsModal: !state.detailsModal,
    }));
  };

  const setSelected = (event, sale) => {
    event.preventDefault();
    const roleCapitalized =
      sale.user.role.charAt(0).toUpperCase() + sale.user.role.slice(1);
    setState({
      userName: sale.user.name,
      userEmail: sale.user.email,
      userRole: roleCapitalized,
    });
    toggleDetailsModal();
  };

  const close = (event) => {
    event.preventDefault();
    setState(initialState);
    toggleDetailsModal();
  };

  const onKeyDown = (event) => {
    if ((event.charCode || event.keyCode) === 13) {
      event.preventDefault();
      toggleDetailsModal();
    }
  };

  let productsMap = props.data.sales.map((sale) => (
    <tr key={sale._id}>
      <td>
        <p
          data-id={sale.user._id}
          className="admin__item-name"
          onClick={(event) => setSelected(event, sale)}
          style={{ textDecoration: 'underline' }}
        >
          {truncateString(sale.user._id, 5)}
        </p>
      </td>
      <td>
        <p data-id={sale.product._id}>{sale.product.name}</p>
      </td>
      <td>{sale.createdAt.split('T')[0]}</td>
      <td>{sale.price}</td>
      <td>{sale.paid ? 'Paid' : 'Not paid'}</td>
    </tr>
  ));

  let detailsModal = (
    <div>
      <Modal isOpen={state.detailsModal} toggle={close} centered={true}>
        <ModalHeader toggle={close}>Add Store</ModalHeader>
        <ModalBody>
          <form
            className="form form-user-data"
            onKeyDown={(event) => onKeyDown(event)}
          >
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="form__input form__input-readonly"
                type="text"
                value={state.userName}
                name="name"
                readOnly
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="form__input form__input-readonly"
                type="email"
                value={state.userEmail}
                name="email"
                readOnly
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="email">
                Role
              </label>
              <input
                id="email"
                className="form__input form__input-readonly"
                type="text"
                value={state.userRole}
                name="email"
                readOnly
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn--small btn--green" onClick={close}>
            Close
          </button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );

  let userGearMarkup = (
    <div>
      {detailsModal}
      <Table className="admin__table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Product</th>
            <th>Date</th>
            <th>Price</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>{productsMap}</tbody>
      </Table>
    </div>
  );

  let markup;
  if (props.data.loading) {
    markup = (
      <div className="spinner--container">
        <Spinner className="spinner" size="md" color="dark" />
      </div>
    );
  } else if (props.data.sales.length <= 0) {
    markup = noContentMarkup(props.user.credentials.role);
  } else {
    markup = userGearMarkup;
  }

  return <Container>{markup}</Container>;
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { getSales })(Sales);
