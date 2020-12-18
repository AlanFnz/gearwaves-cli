import React, { useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom'

const MyGear = (props) => {

  useEffect(() => {
  }, []);

  return (
    <Container>
      <div className="user-view__form-container">
        <Row className="cta__content"><h2 className="heading-secondary ma-bt-md">Anything yet :(</h2></Row>
        <Row className="cta__content"><Link to="/"><button className="btn btn--small btn--green">Buy new gear!</button></Link></Row>
      </div>
    </Container>
  );
};

export default MyGear;