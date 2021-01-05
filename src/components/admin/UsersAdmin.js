import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';
// Components
import {
  Container,
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
// Redux
import { connect } from 'react-redux';
// Actions
import { getUsers } from '../../redux/actions/dataActions';
// Functions
import { noContentMarkup } from '../../util/functions';
// Icons
import trash from '../../img/trash.svg';
import edit from '../../img/edit-black.svg';

const UsersAdmin = (props) => {
  const { getUsers, loading } = props;

  const initialState = {
    editModal: false,
    deleteModal: false,
    selected: '',
    name: '',
    email: '',
    role: '',
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    async function fetchData() {
      await getUsers();
    }
    if (!props.data.fetchedUsers) fetchData();
  }, [getUsers, props.data.fetchedUsers]);

  const toggle = (event, modal) => {
    if (event) event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      [modal]: !state[modal],
    }));
  };

  const setSelected = (event, action, user) => {
    event.preventDefault();
    setState({
      selected: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    if (action === 'edit') {
      toggle(null, 'editModal');
    } else {
      toggle(null, 'deleteModal');
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const save = async (event) => {
    console.log(state);
    if (event) event.preventDefault();
    const data = { role: state.role };

    try {
      const res = await axios({
        method: 'PATCH',
        url: `/users/${state.selected}`,
        data,
      });
      if (res.data.status === 'success') {
        showAlert('success', `User updated successfully`);
        window.setTimeout(() => {
          setState(initialState);
          getUsers();
        }, 1500);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  };

  const handleDelete = async (event) => {
    if (event) event.preventDefault();

    try {
      const res = await axios({
        method: 'DELETE',
        url: `/users/${state.selected}`,
      });
      if (res.status === 204) {
        showAlert('success', `User deleted succesfully`);
        window.setTimeout(() => {
          setState(initialState);
          getUsers();
        }, 1500);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  };

  const cancel = (event) => {
    if (event) event.preventDefault();
    setState(initialState);
  };

  const onKeyDown = (event) => {
    if ((event.charCode || event.keyCode) === 13) {
      event.preventDefault();
    }
  };

  let deleteUserMarkup = (
    <div>
      <Modal isOpen={state.deleteModal} toggle={cancel} centered={true}>
        <ModalHeader toggle={cancel}>Delete User</ModalHeader>
        <ModalBody style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>
            Are you sure? This can't be undonde
          </p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn--small btn--red" onClick={handleDelete}>
            Delete
          </button>{' '}
          <button className="btn btn--small btn--green" onClick={cancel}>
            Cancel
          </button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );

  let usersMap =
    props.data.users &&
    props.data.users.map((user) => {
      const roleCapitalized =
        user.role.charAt(0).toUpperCase() + user.role.slice(1);
      return (
        <tr key={user._id}>
          <td>
            <p data-id={user.id} className="admin__item-name">
              {user.name}
            </p>
          </td>
          <td>{roleCapitalized}</td>
          <td>
            {' '}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'flex-start',
              }}
            >
              <img
                className="nav__icon pointer"
                style={{ marginLeft: '1px', flex: '1', maxWidth: '2rem' }}
                src={edit}
                alt="Edit User"
                onClick={(event) => setSelected(event, 'edit', user)}
              />
              <img
                className="nav__icon pointer"
                style={{ marginLeft: '1px', flex: '1', maxWidth: '2rem' }}
                src={trash}
                alt="Delete User"
                onClick={(event) => setSelected(event, 'delete', user)}
              />
            </div>
          </td>
        </tr>
      );
    });

  let editUserMarkup = (
    <div>
      <Modal isOpen={state.editModal} toggle={cancel} centered={true}>
        <ModalHeader toggle={cancel}>Edit User</ModalHeader>
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
                value={state.name}
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
                value={state.email}
                name="email"
                readOnly
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="role">
                Role
              </label>
              <Input
                type="select"
                name="select"
                id="role"
                className="form__input form__input-select"
                onChange={handleChange}
              >
                <option
                  selected={state.role === 'user' ? true : false}
                  value="user"
                >
                  User
                </option>
                <option
                  selected={state.role === 'sales' ? true : false}
                  value="sales"
                >
                  Sales
                </option>
                <option
                  selected={state.role === 'technical' ? true : false}
                  value="technical"
                >
                  Technical
                </option>
                <option
                  selected={state.role === 'admin' ? true : false}
                  value="admin"
                >
                  Admin
                </option>
              </Input>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn--small btn--green" onClick={save}>
            Save
          </button>{' '}
          <button className="btn btn--small btn--red" onClick={cancel}>
            Cancel
          </button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );

  let usersMarkup = !loading ? (
    <div>
      {editUserMarkup}
      {deleteUserMarkup}
      <Table className="admin__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{usersMap}</tbody>
      </Table>
    </div>
  ) : null;

  let markup;
  if (props.data.loading) {
    markup = <Spinner size="md" color="dark" />;
  } else if (props.data.users && props.data.users.length <= 0) {
    markup = noContentMarkup(props.user.credentials.role);
  } else {
    markup = usersMarkup;
  }

  return <Container>{markup}</Container>;
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { getUsers })(UsersAdmin);
