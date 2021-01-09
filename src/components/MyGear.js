import React, { useEffect } from 'react';
// Components
import { Container, Spinner, Table } from 'reactstrap';
// Redux
import { connect } from 'react-redux';
// Actions
import { getByUser } from '../redux/actions/dataActions';
// Functions
import { noContentMarkup } from '../util/functions';

const MyGear = (props) => {
  const { getByUser } = props;
  const userId = props.user.credentials._id;

  useEffect(() => {
    getByUser(userId, 'purchases');
  }, [getByUser, userId]);

  let productsMap = props.data.gear.map((product) => (
    <tr key={product.product._id}>
      <td><p data-id={product.product._id}>{product.product.name}</p></td>
      <td>{product.createdAt.split('T')[0]}</td>
      <td>{product.price}</td>
      <td>{product.paid ? 'Paid' : 'Not paid'}</td>
    </tr>
  ));

  let userGearMarkup = (
    <div>
    <Table className="admin__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Price</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        {productsMap}
      </tbody>
    </Table>   
    </div> 
  );

  let markup;
  if (props.data.loading) {
    markup = <div className="spinner--container"><Spinner className="spinner" size="md" color="dark" /></div>;
  } else if (props.data.gear.length <= 0) {
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

export default connect(mapStateToProps, { getByUser })(MyGear);
