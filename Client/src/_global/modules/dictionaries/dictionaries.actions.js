import {
  SET_EDU_FORMS,
  SET_DIRECTION_TYPES,
  SET_DISTRIBUTION_TYPES,
  SET_PROFILES,
  CLEAR_PROFILES
} from '../../_global/constants';
import fetching from '../../_global/helpers/fetching';

import {
  apiGetEduForms,
  apiGetPgTypes,
  apiGetProfiles
} from './dictionaries.api';

export function getEduForms(args) {
  return fetching('getEduForms', async dispatch => {
    const res = await apiGetEduForms(args);
    dispatch({ type: SET_EDU_FORMS, data: res });
  });
}

export function getDirectionTypes() {
  return fetching('getDirectionTypes', async dispatch => {
    const res = await apiGetPgTypes(1);
    dispatch({ type: SET_DIRECTION_TYPES, data: res });
    return res;
  });
}

export function getDistributionTypes() {
  return fetching('getDistributionTypes', async dispatch => {
    const res = await apiGetPgTypes(2);
    dispatch({ type: SET_DISTRIBUTION_TYPES, data: res });
    return res;
  });
}

export function getProfiles(specialityId, args) {
  return fetching('getProfiles', async dispatch => {
    const res = await apiGetProfiles(specialityId, args);
    dispatch({ type: SET_PROFILES, data: res });
    return res;
  });
}

export function clearProfiles() {
  return dispatch => dispatch({ type: CLEAR_PROFILES });
}
