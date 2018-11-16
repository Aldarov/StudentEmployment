import {
  SET_ORGANIZATION_LIST,
  SET_ORGANIZATION_LIST_SORTING,
  DELETE_ORGANIZATION,
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

export function getOrganizationSuggestions(search, callback) {
  return async () => {
    const res = await apiGetOrganizations({ limit: 20, search });
    callback(res.data.map(item => ({ value: item.id, label: item.name })));
    return res;
  };
}

export function sortOrganizationList(sorting) {
  return (dispatch, getState) => {
    const { limit, page } = getState().organization.list.info;
    return dispatch(getOrganizationList({ limit, page, sorting }));
  };
}

export function changeOrganizationListPage(newPage) {
  return (dispatch, getState) => {
    const { limit, page, sorting } = getState().organization.list.info;
    if (newPage != page ) {
      dispatch(getOrganizationList({ limit, page: newPage, sorting }));
    }
  };
}

// export function getOrganizationListSuggestion(searchId) {
//   return (dispatch, getState) => {
//     const { limit } = getState().organization.list;
//     const args = { limit, id: searchId || null };

//     return dispatch(getOrganizationList(args));
//   };
// }

// export function clearOrganizationListSuggestion() {
//   return (dispatch, getState) => {
//     const { limit, page, sorting } = getState().organization.list.info;
//     const args = { limit, page, sorting };

//     return dispatch(getOrganizationList(args));
//   };
// }

// export function deleteOrganization(id) {
//   return fetching('deleteOrganization', async dispatch => {
//     await apiDeleteOrganization(id);
//     dispatch({ type: DELETE_ORGANIZATION, data: id });
//   });
// }
