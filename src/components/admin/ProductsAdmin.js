import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Container, Row, Col, Spinner, Table } from 'reactstrap';
import ProductCardAdmin from './ProductCardAdmin';
// Redux
import { connect } from 'react-redux';
// Actions
import { getByUser, getProducts } from '../../redux/actions/dataActions';
// Functions
import { noContentMarkup } from '../../util/functions';

const ProductsAdmin = (props) => {
  const { getProducts, loading } = props;

  const [state, setState] = useState({
    selected: null,
  });

  const setSelected = (event) => {
    // console.log(event.target.attributes[0].value);
    setState({ selected: event.target.attributes[0].value });
  };

  const cleanSelected = () => {
    setState({ selected: null })
  }

  useEffect(() => {
    async function fetchData() {
      await getProducts();
    }
    if (!props.data.fetched) fetchData();
  }, [getProducts, props.data.fetched])

  let productsMap = props.data.products.map((product) => (
    <tr key={product._id}>
      <td data-id={product.id} onClick={setSelected}>{product.name}</td>
      <td>{product.stock}</td>
      <td>{product.price}</td>
      <td>{product.locations.length}</td>
    </tr>
  ));

  let productsMarkup = !loading ? 
  <div>
    <Table className="admin__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Stores</th>
        </tr>
      </thead>
      <tbody>
        {productsMap}
      </tbody>
    </Table>   
    </div> : <Spinner size='sm' type="grow" color="dark" />
 
  let markup;
  if (props.data.loading) {
    markup = <Spinner size="md" color="dark" />;
  } else if (props.data.products <= 0) {
    markup = noContentMarkup(props.user.credentials.role);
  } else if (state.selected) {
    markup = <ProductCardAdmin product={props.data.products.find(product => product.id === state.selected)} cleanSelected={cleanSelected} />
  } else {
    markup = productsMarkup;
  }

  return <Container>{markup}</Container>;
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { getByUser, getProducts })(ProductsAdmin);