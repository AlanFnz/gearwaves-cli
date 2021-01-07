/* eslint-disable import/no-anonymous-default-export */
import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_GEAR,
  SET_REVIEWS,
  SET_EXPERTS,
  SET_USERS,
  UPDATE_REVIEW,
  UPDATE_PRODUCTS,
  DELETE_PRODUCT,
  DELETE_REVIEW,
  LOADING_UI,
  LOADING_DATA,
  CLEAR_PRODUCT,
} from '../types';

const initialState = {
  products: [],
  product: {},
  gear: [],
  reviews: [],
  users: [],
  experts: [],
  loading: false,
  fetchedProducts: false,
  fetchedUsers: false,
  editProductOpen: false,
};

export default function (state = initialState, action) {
  let index;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload.data.data,
        loading: false,
        fetchedProducts: true,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload.data.data,
        loading: false,
        fetchedUsers: true,
      };
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload.data.data,
        loading: false,
      };
    case SET_GEAR:
      return {
        ...state,
        gear: action.payload.data.data,
        loading: false,
      };
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload.data.data,
        loading: false,
      };
    case SET_EXPERTS:
      return {
        ...state,
        experts: action.payload.data.data,
        loading: false,
      };
    case UPDATE_REVIEW:
      index = state.reviews.findIndex(
        (review) => review.id === action.payload.data.data.id
      )
      state.reviews[index] = action.payload.data.data
      return {
        ...state,
      };
    case UPDATE_PRODUCTS:
      index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index > -1) {
        state.products[index] = action.payload
      } else {
        state.products.push(action.payload);
      }
      return {
        ...state,
      }
    case DELETE_PRODUCT:
      index = state.products.findIndex(
        (product) => product._id === action.payload
      );
      if (index !== -1) state.products.splice(index, 1);
      return {
        ...state
      }
    case DELETE_REVIEW:
      index = state.reviews.findIndex(
        (review) => review._id === action.payload
      );
      if (index !== -1) state.reviews.splice(index, 1);
      return {
        ...state
      }
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: {},
      };
    default:
      return state;
  }
}
