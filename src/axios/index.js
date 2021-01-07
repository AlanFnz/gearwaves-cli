// Axios config
import axios from 'axios'

export default axios.create({
    baseURL: `https://gearwaves-api.herokuapp.com/api/v1/`,
    withCredentials: true,
});
