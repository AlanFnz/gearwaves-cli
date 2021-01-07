import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_GEAR,
  SET_REVIEWS,
  SET_EXPERTS,
  SET_USERS,
  UPDATE_REVIEW,
  DELETE_REVIEW,
  UPDATE_PRODUCTS,
  DELETE_PRODUCT,
  LOADING_DATA,
  CLEAR_PRODUCT,
} from '../types';
import axios from '../../axios';

// Get all products
export const getProducts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/products')
    .then((res) => {
      dispatch({
        type: SET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get all users
export const getUsers = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/users')
    .then((res) => {
      dispatch({
        type: SET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get one product
export const getProduct = (slug) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/products/view/${slug}`)
    .then((res) => {
      dispatch({
        type: SET_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get reviews or purchases by user
export const getByUser = (userId, item) => (dispatch) => {
  let type;
  if (!item) return;
  if (item === 'purchases') {
    type = SET_GEAR;
  } else {
    type = SET_REVIEWS;
  }
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/users/${item}`, {
      params: {
        user: userId,
      },
    })
    .then((res) => {
      dispatch({
        type: type,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get reviews by products
export const getReviewsByProduct = (productId) => (dispatch) => {
  axios
  .get(`/products/${productId}/reviews`)
  .then((res) => {
    dispatch({
      type: SET_REVIEWS,
      payload: res.data,
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

// Update review
export const updateReview = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_REVIEW,
    payload: data,
  });
};

// Delete review
export const deleteReview = (id) => (dispatch) => {
  dispatch({
    type: DELETE_REVIEW,
    payload: id,
  });
};

// Update products array
export const updateProducts = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCTS,
    payload: data,
  });
};

// Delete product from products array
export const deleteProduct = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT,
    payload: id,
  })
}

// Get experts (users with role = technical || sales)
export const getExperts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/users/experts')
    .then((res) => {
      dispatch({
        type: SET_EXPERTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Set one product
export const setProduct = (product) => (dispatch) => {
  let productObject = { data: { data: product } };
  dispatch({
    type: SET_PRODUCT,
    payload: productObject,
  });
};

// Clear product
export const clearProduct = () => (dispatch) => {
  dispatch({ type: CLEAR_PRODUCT });
};
