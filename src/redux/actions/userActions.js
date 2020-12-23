import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from '../types';
import axios from '../../axios';

// Set loading user
export const loadingUser = (condition) => (dispatch) => {
  dispatch({
    type: LOADING_USER,
    payload: condition,
  });
};

// Set user
export const setUser = (userData) => (dispatch) => {
  console.log(userData);
  dispatch({ 
    type: SET_USER,
    payload: userData,
  });
};

// Logout user
export const logoutUser = () => (dispatch) => {
  dispatch({ type: SET_UNAUTHENTICATED });
};

// Get the user data
export const getUserData = () => (dispatch) => {
    axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Upload profile image
export const uploadImage = (formData) => dispatch => {
  dispatch({ type: LOADING_USER })
  axios.post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

// Sign up an User
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', newUserData)
    .then((res) => {
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Edit user details
export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: LOADING_USER })
  axios.post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};


