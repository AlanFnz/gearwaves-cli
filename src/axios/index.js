// Axios config
import axios from 'axios'

export default axios.create({
    withCredentials: true,
    baseURL: `https://gearwaves-api.herokuapp.com/api/v1/`,
});
