/* eslint-disable import/no-anonymous-default-export */
import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_GEAR,
  SET_REVIEWS,
  SET_EXPERTS,
  UPDATE_REVIEW,
  UPDATE_PRODUCTS,
  LOADING_UI,
  LOADING_DATA,
  CLEAR_PRODUCT,
} from '../types';

const initialState = {
  products: [],
  product: {},
  gear: [],
  reviews: [],
  experts: [],
  loading: false,
  fetched: false,
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
        fetched: true,
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
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: {},
      };
    default:
      return state;
  }
}
