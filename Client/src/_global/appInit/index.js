import axiosInit from './axios.init';
import { checkAuth } from '../modules/auth';
import { getEduForms, getDirectionTypes, getDistributionTypes } from '../modules/dictionaries';

export default store => {
  axiosInit(store);
  store.dispatch(checkAuth());
  store.dispatch(getEduForms());
  store.dispatch(getDirectionTypes());
  store.dispatch(getDistributionTypes());
};
