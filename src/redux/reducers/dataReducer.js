/* eslint-disable import/no-anonymous-default-export */
import {
  SET_PRODUCTS,
  SET_PRODUCT,
  SET_ERRORS,
  CLEAR_ERRORS,
  CLEAR_SNIPPETS,
  LOADING_UI,
  LOADING_DATA,
} from '../types';

const initialState = {
  products: [],
  product: {},
  loading: false,
  fetched: false,
};

export default function (state = initialState, action) {
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
    default:
      return state;
  };
};
