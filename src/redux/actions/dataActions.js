import { 
  SET_PRODUCTS,
  SET_PRODUCT, 
  SET_ERRORS,
  CLEAR_ERRORS,
  CLEAR_SNIPPETS,
  LOADING_UI, 
  LOADING_DATA 
} from '../types';
import axios from '../../axios';

// Get all products
export const getProducts = () => (dispatch) => {
  console.log('redux data action');
  // axios
  //   .get('/products')
  //   .then((res) => {
  //     dispatch({
  //       type: SET_PRODUCTS,
  //       payload: res.data,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   });
};

