import axios from 'axios';
import { refreshToken, logout } from '../auth';

const setRequestHeader = token => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export function initAxios(store) {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.baseURL = '/';

  setRequestHeader(localStorage.getItem('access_token'));

  axios.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      if (error.response.status === 401) {
        return refreshToken()
          .then(token => {
            setRequestHeader(token.access_token);
            let prev_req = error.config;
            prev_req.headers.Authorization = 'Bearer ' + token.access_token;
            return axios(prev_req);
          });
      }
      if (error.response.status === 403) {
        store.dispatch(logout());
      }

      return Promise.reject(error.response);
    }
  );
}

