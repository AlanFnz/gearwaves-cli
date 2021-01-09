import React, { useEffect, useState } from 'react';
// Components
import { Container, Spinner, Table } from 'reactstrap';
import ProductCardAdmin from './ProductCardAdmin';
// Redux
import { connect } from 'react-redux';
// Actions
import { getByUser, getProduct, getProducts, clearProduct } from '../../redux/actions/dataActions';
// Functions
import { noContentMarkup } from '../../util/functions';

const ProductsAdmin = (props) => {
  const { getProducts, getProduct, clearProduct, loading } = props;

  const [state, setState] = useState({
    selected: '',
  });

  const setSelected = (event) => {
    const productSlug = props.data.products.filter(product => product._id === event.target.dataset.id)[0].slug;
    async function fetchData() {
      await getProduct(productSlug);
      setState({ 
        selected: event.target.attributes[0].value,
      });
    };
    fetchData(productSlug);
  };

  const setAddNew = (event) => {
    event.preventDefault();
    console.log('add new product');
    setState({ 
      selected: 'new',
    });
  }

  const cleanSelected = () => {
    setState({ selected: '' })
    clearProduct();
  }

  useEffect(() => {
    async function fetchData() {
      await getProducts();
    }
    if (!props.data.fetchedProducts) fetchData();
  }, [getProducts, props.data.fetchedProducts])

  let productsMap = props.data.products.map((product) => (
    <tr key={product._id}>
      <td><p data-id={product._id} className="admin__item-name" onClick={setSelected} style={{ textDecoration: 'underline' }}>{product.name}</p></td>
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
    <div className="center admin__item-add--container">
      <button className="btn btn--small btn--green" onClick={setAddNew}>+</button>
    </div>
    </div> : null;
 
  let markup;
  if (props.data.loading) {
    markup = <div className="spinner--container"><Spinner className="spinner" size="md" color="dark" /></div>;
  } else if (props.data.products && props.data.products.length <= 0) {
    markup = noContentMarkup(props.user.credentials.role);
  } else if (state.selected) {
    markup = <ProductCardAdmin cleanSelected={cleanSelected} />
  } else {
    markup = productsMarkup;
  }

  return <Container>{markup}</Container>;
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { getByUser, getProduct, getProducts, clearProduct })(ProductsAdmin);