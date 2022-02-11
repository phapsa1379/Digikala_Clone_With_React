import axios from "axios";
import { PATHS } from "configs/routes.config";
import { BASE_URL } from "configs/variables.config";
// import {toast} from 'react-toastify';
// import history from './history.service';
// import errorMap from 'assets/data/error-map';

class HttpService {
  constructor() {
    axios.defaults.baseURL = BASE_URL;
  }

  get(url, config) {
    return axios.get(url, config);
  }

  post(url, data, config) {
    return axios.post(url, data, config);
  }

  put(url, data, config) {
    return axios.put(url, data, config);
  }

  patch(url, data, config) {
    return axios.patch(url, data, config);
  }

  delete(url, config) {
    return axios.delete(url, config);
  }
}

export default new HttpService();
