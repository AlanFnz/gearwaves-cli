import React, { useEffect } from "react";
// Components
import ProductCard from "../components/ProductCard";
import { Container, Row, Col, Spinner } from 'reactstrap';
import { showAlert } from '../util/alerts';
// Redux
import { connect } from 'react-redux';
// Actions
import { getProducts } from '../redux/actions/dataActions';

const Home = props => {

  const { getProducts, loading } = props;

  useEffect(() => {
    async function fetchData() {
      await getProducts();
    }
    if (!props.data.fetchedProducts) fetchData();
    if (props.match.path === '/success' && props.user.authenticated) {
      console.log('success');
      showAlert('success', `Success!, check "My Gear" section in your account`, 5);
      window.setTimeout(() => {
        props.history.push('/');
      }, 1500);
    }
  }, [props.history, props.match.path, getProducts, props.data.fetchedProducts, props.user.authenticated])

  let productsMap = props.data.products.map((product) => (
    <Col key={product._id}><ProductCard product={product} key={product._id} /></Col>
  ));

  let productsMarkup = !loading ? productsMap : <div className="spinner--container"><Spinner className="spinner" size="md" color="dark" /></div>;

  return (
    <main className="main">
      <Container>
        <div className="card--container">
          <Row xs="1" md="2" lg="3">
          {productsMarkup}
          </Row>
        </div>
      </Container>
    </main>
  );
};

const mapStateToProps = state => ({
  data: state.data,
  user: state.user,
});

export default connect(mapStateToProps, { getProducts })(Home);
