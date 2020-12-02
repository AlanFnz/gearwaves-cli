import React, { useEffect } from "react";
import axios from '../axios';
// Components
import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from 'reactstrap';
// Redux
import { connect } from 'react-redux';
// Actions
import { getProducts } from '../redux/actions/dataActions';

const Home = (props) => {

  useEffect(() => {
      console.log('use effect')
      props.getProducts();
  }, [props])

  return (
    <main className="main">
      <Container>
        <div className="card--container">
          <Row xs="1" md="2" lg="3">
          <Col><ProductCard /></Col>
          <Col><ProductCard /></Col>
          <Col><ProductCard /></Col>
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
