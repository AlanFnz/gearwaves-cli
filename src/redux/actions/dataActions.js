import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_GEAR,
  SET_REVIEWS,
  UPDATE_REVIEW,
  LOADING_DATA,
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

// Get update review
export const updateReview = (data) => (dispatch) => {
  dispatch({ 
    type: UPDATE_REVIEW,
    payload: data
  });
};
