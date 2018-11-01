import {
  SET_ORGANIZATION_LIST,
  SET_ORGANIZATION_LIST_SORTING,
  DELETE_ORGANIZATION,

  SET_ORGANIZATION_SUGGESTIONS,
  CLEAR_ORGANIZATION_SUGGESTIONS
} from '../../_global/constants';
import {
  apiGetOrganizations, apiDeleteOrganization
} from './organizationList.api';
import fetching from '../../_global/helpers/fetching';

function getOrganizationList(args) {
  return fetching('getOrganizationList', async dispatch => {
    const res = await apiGetOrganizations(args);
    dispatch({ type: SET_ORGANIZATION_LIST, data: res });
    if (args.sorting)
      dispatch({ type: SET_ORGANIZATION_LIST_SORTING, data: args.sorting });
    return res;
  });
}

export function initOrganizationList() {
  return (dispatch, getState) => {
    const { limit, page, sorting } = getState().organization.list.info;

    const sort = sorting && sorting.length > 0 ? sorting : [{columnName: 'name', direction: 'asc'}];
    const args = { limit, page, sorting: sort };

    return dispatch(getOrganizationList(args));
  };
}

export function getOrganizationListSuggestion(searchId) {
  return (dispatch, getState) => {
    const { limit } = getState().organization.list;
    const args = { limit, id: searchId || null };

    return dispatch(getOrganizationList(args));
  };
}

export function clearOrganizationListSuggestion() {
  return (dispatch, getState) => {
    const { limit, page, sorting } = getState().organization.list.info;
    const args = { limit, page, sorting };

    return dispatch(getOrganizationList(args));
  };
}

export function getOrganizationSuggestions(search) {
  return fetching('getOrganizationSuggestions', async dispatch => {
    const args = { limit: 20, search };
    const res = await apiGetOrganizations(args);
    dispatch({ type: SET_ORGANIZATION_SUGGESTIONS, data: res.data });
    return res;
  });
}

export function clearOrganizationSuggestions() {
  return dispatch => dispatch({ type: CLEAR_ORGANIZATION_SUGGESTIONS });
}

export function deleteOrganization(id) {
  return fetching('deleteOrganization', async dispatch => {
    await apiDeleteOrganization(id);
    dispatch({ type: DELETE_ORGANIZATION, data: id });
  });
}
