import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
// Components
import { Container, Row, Col, Spinner, Table } from 'reactstrap';
import ReviewCard from '../ReviewCard';
// Redux
import { connect } from 'react-redux';
// Actions
import {
  getByUser,
  getReviewsByProduct,
  getProducts,
  clearProduct,
} from '../../redux/actions/dataActions';
// Functions
import { noContentMarkup } from '../../util/functions';

const ReviewsAdmin = (props) => {
  const { getProducts, clearProduct, getReviewsByProduct, loading } = props;

  const [state, setState] = useState({
    selected: '',
    productName: '',
  });

  useEffect(() => {
    async function fetchData() {
      await getProducts();
    }
    if (!props.data.fetchedProducts) fetchData();
  }, [getProducts, props.data.fetchedProducts]);

  const setSelected = (product) => {
    setState({
      selected: product._id,
      productName: product.name,
    });
    props.getReviewsByProduct(product._id);
  };

  const cleanSelected = () => {
    setState({ selected: '', productName: '' });
  };

  let productsMap = props.data.products.map((product) => (
    <tr key={product._id}>
      <td>
        <p
          data-id={product.id}
          className="admin__item-name"
          onClick={() => setSelected(product)}
          style={{ textDecoration: 'underline' }}
        >
          {product.name}
        </p>
      </td>
      <td>{product.ratingsAverage}</td>
      <td>{product.ratingsQuantity}</td>
    </tr>
  ));

  let productsMarkup = !loading ? (
    <Container>
      <div>
        <Table className="admin__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Avg</th>
              <th>Reviews</th>
            </tr>
          </thead>
          <tbody>{productsMap}</tbody>
        </Table>
      </div>
    </Container>
  ) : null;

  let reviewsMarkup = !loading
    ? props.data.reviews &&
      props.data.reviews.map((review, i) => (
        <ReviewCard review={review} delete={true} />
      ))
    : null;

  let reviewsDisplayMarkup = (
    <Container className="user-view__form-reviews">
      <div className="user-view__form-container user-view__form-container__reviews">
        <h2 className="heading-secondary ma-bt-md">
          Reviews of {state.productName}
        </h2>
        <section className="section-reviews__user">
          <div className="reviews__by-user">{reviewsMarkup}</div>
        </section>
      </div>
      <div className="center admin__item-add--container">
        <button className="btn btn--small btn--green" onClick={cleanSelected}>
          Back
        </button>
      </div>
    </Container>
  );

  let markup;
  if (props.data.loading) {
    markup = <Spinner size="md" color="dark" />;
  } else if (props.data.products && props.data.products.length <= 0) {
    markup = noContentMarkup(props.user.credentials.role);
  } else if (state.selected) {
    markup = reviewsDisplayMarkup;
  } else {
    markup = productsMarkup;
  }

  return <Fragment>{markup}</Fragment>;
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, {
  getByUser,
  getReviewsByProduct,
  getProducts,
  clearProduct,
})(ReviewsAdmin);
