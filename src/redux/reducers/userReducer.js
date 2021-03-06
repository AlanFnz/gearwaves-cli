/* eslint-disable import/no-anonymous-default-export */
import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        credentials: action.payload.data.user,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}
