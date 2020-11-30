import React from "react";
// Components
import ProductCard from "../components/ProductCard";
import { Container, Row, Col } from 'reactstrap';

const Home = () => {
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

export default Home;
