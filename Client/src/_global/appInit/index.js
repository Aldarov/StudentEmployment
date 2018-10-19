import axiosInit from './axios.init';
import { checkAuth } from '../modules/auth';

export default store => {
  axiosInit(store);
  store.dispatch(checkAuth());
};
