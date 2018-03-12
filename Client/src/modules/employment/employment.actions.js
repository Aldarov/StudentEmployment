import {
  SET_SPECIALITIES_SUGGESTIONS,
  CLEAR_SPECIALITIES_SUGGESTIONS,
  SET_EMPLOYMENT_CONTRACT,
  SET_SCHOOLS_SUGGESTIONS,
  CLEAR_SCHOOLS_SUGGESTIONS,
  SET_ORGANIZATIONS_SUGGESTIONS,
  CLEAR_ORGANIZATIONS_SUGGESTIONS,
} from '../../constants';

import { fetching } from '../busyIndicator';
import {
  apiGetEmploymentById, apiPostEmployment,
} from './employment.api';
import { apiGetSpecialities, apiGetSchools } from '../layout';
import { apiGetOrganizations } from '../organizationList';
import { initialize } from 'redux-form';

export function initEmploymentForm(id, formName) {
  return dispatch => {
    if (!id) {
      dispatch(initialize(formName, {
        specialityId: null,
        entraceYear: null,
        eduFormId: null,
        docDate: null,
        pgContractStuffs: [],
        speciality: ''
      }, false, { keepSubmitSucceeded: true }));
    } else {
      fetching(dispatch, formName,
        apiGetEmploymentById(id).then(res =>
          apiGetSpecialities({ id: res.specialityId }).then(spec => {
            const speciality = (spec.data[0] && spec.data[0].name) || '';
            const stuff = res.pgContractStuffs.sort(function (a, b) {
              const fullNameA = a.student.fullName;
              const fullNameB = b.student.fullName;
              if (fullNameA > fullNameB) {
                return 1;
              }
              if (fullNameA < fullNameB) {
                return -1;
              }
              return 0;
            });
            res.pgContractStuffs = stuff;
            const result = { ...res, speciality };
            dispatch(initialize(formName, result, false, { keepSubmitSucceeded: true }));
          })
        )
      );
    }
  };
}

export function saveEmployment(data, formName, callback) {
  return dispatch => {
    const stuff = data.pgContractStuffs.map(item => {
      return {
        ...item,
        student: null
      };
    });
    const res = {
      ...data,
      pgContractStuffs: stuff
    };
    fetching(dispatch, formName, apiPostEmployment(res).then(data => callback(data)));
  };
}

export function getSpecialitiesSuggestion(params, formName) {
  return dispatch => fetching(dispatch, formName,
    apiGetSpecialities(params).then(res =>
      dispatch({ type: SET_SPECIALITIES_SUGGESTIONS, data: res.data })
    ));
}

export function clearSpecialitiesSuggestion() {
  return dispatch => dispatch({ type: CLEAR_SPECIALITIES_SUGGESTIONS });
}

export function openEmploymentContract(title, tableRow,
  showDirectionSchools, showDirectionOrganizations, showDistributionSchools, showDistributionOrganizations ) {
  return dispatch => dispatch({ type: SET_EMPLOYMENT_CONTRACT,
    data: { title, tableRow, opened: true,
      showDirectionSchools, showDirectionOrganizations, showDistributionSchools, showDistributionOrganizations
    }
  });
}

export function closeEmploymentContract() {
  return dispatch => dispatch({ type: SET_EMPLOYMENT_CONTRACT,
    data: { title: '', tableRow: null, opened: false,
      showDirectionSchools: false, showDirectionOrganizations: false, showDistributionSchools: false, showDistributionOrganizations: false
    }
  });
}

export function showDirectionOrganizations(type) {
  return dispatch => {
    let data;
    if (type === 'school') {
      data = { showDirectionSchools: true, showDirectionOrganizations: false };
    } else {
      data = { showDirectionSchools: false, showDirectionOrganizations: true };
    }

    return dispatch({ type: SET_EMPLOYMENT_CONTRACT, data });
  };
}

export function showDistributionOrganizations(type) {
  return dispatch => {
    let data;
    if (type === 'school') {
      data = { showDistributionSchools: true, showDistributionOrganizations: false };
    } else {
      data = { showDistributionSchools: false, showDistributionOrganizations: true };
    }

    return dispatch({ type: SET_EMPLOYMENT_CONTRACT, data });
  };
}

export function hideDirectionOrganizations() {
  return dispatch => dispatch({ type: SET_EMPLOYMENT_CONTRACT,
    data: { showDirectionSchools: false, showDirectionOrganizations: false }
  });
}

export function hideDistributionOrganizations() {
  return dispatch => dispatch({ type: SET_EMPLOYMENT_CONTRACT,
    data: { showDistributionSchools: false, showDistributionOrganizations: false }
  });
}

export function getSchoolsSuggestion(params, formName) {
  return dispatch => fetching(dispatch, formName,
    apiGetSchools(params).then(res =>
      dispatch({ type: SET_SCHOOLS_SUGGESTIONS, data: res.data })
    ));
}

export function clearSchoolsSuggestion() {
  return dispatch => dispatch({ type: CLEAR_SCHOOLS_SUGGESTIONS });
}

export function getOrganizationsSuggestion(params, formName) {
  return dispatch => fetching(dispatch, formName,
    apiGetOrganizations(params).then(res =>
      dispatch({ type: SET_ORGANIZATIONS_SUGGESTIONS, data: res.data })
    ));
}

export function clearOrganizationsSuggestion() {
  return dispatch => dispatch({ type: CLEAR_ORGANIZATIONS_SUGGESTIONS });
}