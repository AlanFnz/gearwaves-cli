import React, { useEffect } from "react";
// Components
import ProductCard from "../components/ProductCard";
import { Container, Row, Col, Spinner } from 'reactstrap';
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
    fetchData();
  }, [getProducts])

  let productsMap = props.data.products.map((product) => (
    <Col><ProductCard product={product} key={product._id} /></Col>
  ));

  let productsMarkup = !loading ? productsMap : <Spinner size='sm' type="grow" color="dark" />;

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
});

export default connect(mapStateToProps, { getProducts })(Home);
