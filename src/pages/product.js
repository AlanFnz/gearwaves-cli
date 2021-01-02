import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Components
import { Container, Row, Col, Spinner } from 'reactstrap';
import ReviewCard from '../components/ReviewCard';
import Mapbox from '../components/Mapbox';
// Redux
import { connect } from 'react-redux';
// Actions
import { getProduct } from '../redux/actions/dataActions';

const Product = (props) => {
  const [isLoading, setLoading] = useState(true);
  const { getProduct, loading } = props;
  const { slug } = props.match.params;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      await getProduct(slug);
      setLoading(false);
    }
    fetchData();
  }, [getProduct, slug]);

  const overviewBox = (label, text, icon) => {
    return (
      <div className="overview-box__detail">
        <svg className="overview-box__icon">
          <use xlink href={`img/icons.svg#icon-${icon}`}></use>
        </svg>
        <span className="overview-box__label">{label}</span>
        <span className="overview-box__text">{text}</span>
      </div>
    );
  };

  const imagesIndex = ['imageLeft', 'imageCenter', 'imageRight'];
  const imagesMarkup = isLoading ? (
    <Spinner size="sm" type="grow" color="dark" />
  ) : (
    props.data.product.imageLeft &&
    imagesIndex.map((image, i) => (
      <div className="picture-box" key={uuidv4()}>
        <img
          className={`picture-box__img picture-box__img--${i + 1}`}
          src={`${process.env.REACT_APP_API_URL}/img/products/${props.data.product[image]}`}
          alt={props.data.product.name}
        />
      </div>
    ))
  );

  const reviewsMarkup = isLoading ? (
    <Spinner size="sm" type="grow" color="dark" />
  ) : (
    props.data.product.reviews &&
    props.data.product.reviews.map((review, i) => (
      <ReviewCard review={review} />
    ))
  );

  let splittedDescription = isLoading
    ? null
    : props.data.product.description &&
      props.data.product.description.split('\n');
  let paragraphs = loading
    ? null
    : splittedDescription &&
      splittedDescription.map((p, i) => (
        <p className="description__text" key={uuidv4()}>
          {p}
        </p>
      ));

  let splittedMadeIn =
    props.data.product.madeIn &&
    props.data.product.madeIn.description.split(',');
  let madeIn = splittedMadeIn && splittedMadeIn[splittedMadeIn.length - 1];

  let expertsMarkup =
    props.data.product.experts &&
    props.data.product.experts.map((expert) => (
      <div className="overview-box__detail">
        <img
          className="overview-box__img"
          src={`${process.env.REACT_APP_API_URL}/img/users/${expert.photo}`}
          alt="Expert"
        />
        <span>{expert.role === 'sales' ? `Sales:` : `Technical:`}&nbsp;</span>
        <span>{expert.name}</span>
      </div>
    ));

  let pageMarkup =
    !isLoading && !loading && props.data.product.images ? (
      <Fragment>
        <section className="section-header">
          <div className="header__hero">
            <div className="header__hero-overlay">&nbsp;</div>
            <img
              className="header__hero-img"
              src={`${process.env.REACT_APP_API_URL}/img/products/${props.data.product.imageCover}`}
              alt="cover"
            />
          </div>
          <div className="heading-box">
            <h1 className="heading-product heading-primary">
              <span>{props.data.product.name}</span>
            </h1>
            {/* <div className="heading-box__group">
              <div className="heading-box__detail">
                <svg className="heading-box__icon">
                  <use xlink href="img/icons.svg#icon-map-pin"></use>
                </svg>
                <span className="heading-box__text"> Warrantly</span>
              </div>
              <div className="heading-box__detail">
                <svg className="heading-box__icon">
                  <use
                    xlink
                    href="http://localhost:8000/img/icons.svg#icon-map-pin"
                  ></use>
                </svg>
                <span className="heading-box__text"> Made in</span>
              </div>
            </div> */}
          </div>
        </section>
        <Container>
          <Row xs="1" md="2" className="section-description">
            <section className="section-overview">
              <Col>
                <div className="overview-box">
                  <div>
                    <div className="overview-box__group">
                      <h2 className="heading-secondary ma-bt-lg">
                        {' '}
                        Quick facts
                      </h2>
                      {overviewBox(
                        'Stock',
                        `${props.data.product.stock} units`,
                        'calendar'
                      )}
                      {overviewBox(
                        'Warrantly',
                        `${props.data.product.warrantly} months`,
                        'trending-up'
                      )}
                      {overviewBox('Made In', madeIn, 'people')}
                      {overviewBox(
                        'Rating',
                        `${props.data.product.ratingsAverage}/5`,
                        'star'
                      )}
                    </div>
                    <div className="overview-box__group">
                      <h2 className="heading-secondary ma-bt-lg">
                        Your experts assistants
                      </h2>
                      {expertsMarkup}
                    </div>
                  </div>
                </div>
              </Col>
            </section>
            <section className="section-product-description">
              <Col>
                <div className="description-box">
                  <h2 className="heading-secondary ma-bt-lg">About product</h2>
                  {paragraphs}
                </div>
              </Col>
            </section>
          </Row>
        </Container>
        <section className="section-pictures">{imagesMarkup}</section>
        <section className="section-map">
          <Mapbox locations={props.data.product.locations} />
        </section>
        <section className="section-reviews">
          <div className="reviews">{reviewsMarkup}</div>
        </section>
        <section className="section-cta">
          <div className="cta">
            <Container>
              <Row xs="1" md="2">
                <Col className="cta__content">
                  <h2 className="heading-secondary cta__heading">
                    {' '}
                    What are you waiting for?
                  </h2>
                  <p className="cta__text">Get the sound you dreamed of</p>
                </Col>
                <Col className="cta__content">
                  <button
                    className="btn btn--green btn--buy span-all-rows"
                    id="purchase-product"
                    data-product-id={props.data.product._id}
                  >
                    Buy now!
                  </button>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </Fragment>
    ) : (
      <Spinner size="sm" type="grow" color="dark" />
    );

  return pageMarkup;
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getProduct })(Product);
