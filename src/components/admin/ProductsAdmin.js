import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Container, Row, Col, Spinner, Table } from 'reactstrap';
import ProdcutCardAdmin from './ProductCardAdmin';
// Redux
import { connect } from 'react-redux';
// Actions
import { getByUser } from '../../redux/actions/dataActions';
// Functions
import { noContentMarkup } from '../../util/functions';

const ProductsAdmin = (props) => {
  const { getProducts, loading } = props;

  useEffect(() => {
    async function fetchData() {
      await getProducts();
    }
    if (!props.data.fetched) fetchData();
  }, [getProducts, props.data.fetched])

  let productsMap = props.data.products.map((product) => (
    <tr key={product._id}>
      <td>{product.name}</td>
      <td>{product.stock}</td>
      <td>{product.locations.length}</td>
      <td>{product.price}</td>
    </tr>
  ));

  let productsMarkup = !loading ? <Table className="admin__table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Stores</th>
      <th>Stock</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    {productsMap}
  </tbody>
</Table> : <Spinner size='sm' type="grow" color="dark" />;

  let markup;
  if (props.data.loading) {
    markup = <Spinner size="md" color="dark" />;
  } else if (props.data.products <= 0) {
    markup = noContentMarkup(props.user.credentials.role);
  } else {
    markup = productsMarkup;
  }

  return <Container>{markup}</Container>;
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { getByUser })(ProductsAdmin);