import { apiGetEmploymentList, apiGetEmploymentById, apiGetSpecialities } from '../api';
import { commonAction } from './commonActions';

export const GET_EMPLOYMENT_LIST = 'GET_EMPLOYMENT_LIST';
export const GET_EMPLOYMENT_SUGGESTIONS = 'GET_EMPLOYMENT_SUGGESTIONS';
export const CLEAR_EMPLOYMENT_SUGGESTIONS = 'CLEAR_EMPLOYMENT_SUGGESTIONS';
export const SET_EMPLOYMENT_LIST_SORTING = 'SET_EMPLOYMENT_LIST_SORTING';
export const GET_EMPLOYMENT_BY_ID = 'GET_EMPLOYMENT_BY_ID';
export const GET_SPECIALITIES_SUGGESTIONS = 'GET_SPECIALITIES_SUGGESTIONS';
export const CLEAR_SPECIALITIES_SUGGESTIONS = 'CLEAR_SPECIALITIES_SUGGESTIONS';

export function getEmploymentList(params) {
  return dispatch =>
    commonAction(dispatch, apiGetEmploymentList(params),
      res => {
        dispatch({ type: GET_EMPLOYMENT_LIST, data: res.data });
        if (params.sorting)
          dispatch({ type: SET_EMPLOYMENT_LIST_SORTING, data: params.sorting });
      }
    );
}

export function getEmploymentSuggestions(params) {
  return dispatch =>
    commonAction(dispatch, apiGetEmploymentList(params),
      res => dispatch({ type: GET_EMPLOYMENT_SUGGESTIONS, data: res.data.data })
    );
}

export function clearEmploymentSuggestions() {
  return dispatch => dispatch({ type: CLEAR_EMPLOYMENT_SUGGESTIONS });
}

// {
//   '0': {
//     id: 9482,
//     studentId: 19801,
//     pgHeaderId: 7,
//     directionTypeId: 1,
//     directionOrganizationId: null,
//     distributionTypeId: 11,
//     distributionOrganizationId: null,
//     directionSchoolId: null,
//     distributionSchoolId: null,
//     jobOnSpeciality: null,
//     directionType: {
//       id: 1,
//       name: 'Уход за ребенком',
//       pgKindId: 1
//     },
//     distributionType: {
//       id: 11,
//       name: 'Не трудоустроен (не состоит на учете в центрах занятости)',
//       pgKindId: 2
//     },
//     directionOrganization: null,
//     distributionOrganization: null,
//     directionSchool: null,
//     distributionSchool: null,
//     student: {
//       studentId: 19801,
//       fullName: 'Цыренова Стелла Алексеевна',
//       regAddress: 'Россия, Бурятия Респ, Окинский р-н, с. Орлик, ул. Телевизионная, д. 33, кв. 2',
//       financeId: 2,
//       finance: 'договор',
//       entrTypeId: 1,
//       entrType: 'общие основания',
//       phone: '',
//       stateId: 2,
//       state: 'окончил',
//       specialityId: 93,
//       educationFormId: 1,
//       entranceYear: 2009
//     }
//   }
// }

const getStudents = (pgContractStuffs) => {
  return pgContractStuffs ? pgContractStuffs.map(function(item) {
    return {
      fullName: item.student.fullName,
      regAddress: item.student.regAddress,
      finance: item.student.finance,
      entrType: item.student.entrType,
      phone: item.student.phone,
      direction: {
        pgContractStuffsId: item.id,
        directionTypeId: item.directionType && item.directionType.id,
        directionOrganizationId: item.directionOrganization && item.directionOrganization.id,
        directionSchoolId: item.directionSchool && item.directionSchool.id,
        text: (
          item.directionType.name +
          (item.directionOrganization ? ', ' + item.directionOrganization.name : '') +
          (item.directionSchool ? ', ' + item.directionSchool.name : '')
        ) || ''
      },
      distribution: {
        pgContractStuffsId: item.id,
        distributionTypeId: item.distributionType && item.distributionType.id,
        distributionOrganizationId: item.distributionOrganization && item.distributionOrganization.id,
        distributionSchoolId: item.distributionSchool && item.distributionSchool.id,
        jobOnSpeciality: item.jobOnSpeciality,
        text: (
          item.distributionType.name +
          (item.distributionOrganization ? ', ' + item.distributionOrganization.name : '') +
          (item.distributionSchool ? ', ' + item.distributionSchool.name : '')
        ) || ''
      }
    };
  }) : [];
};

export function getEmploymentById(id) {
  return dispatch =>
    commonAction(dispatch, apiGetEmploymentById(id),
      res => {
        commonAction(dispatch, apiGetSpecialities({ id: res.data.specialityId }),
          spec => {
            let result = res.data;
            const speciality = (spec.data.data[0] && spec.data.data[0].name) || '';
            // const students = getStudents(result.pgContractStuffs);
            result = { ...result, speciality };
            dispatch({ type: GET_EMPLOYMENT_BY_ID, data: result });
          }
        );

      }
    );
}

export function setEmploymentById(data) {
  return dispatch => dispatch({ type: GET_EMPLOYMENT_BY_ID, data: data });
}

export function getSpecialitiesSuggestion(params) {
  return dispatch =>
    commonAction(dispatch, apiGetSpecialities(params),
      res => dispatch({ type: GET_SPECIALITIES_SUGGESTIONS, data: res.data.data })
    );
}

export function clearSpecialitiesSuggestion() {
  return dispatch => dispatch({ type: CLEAR_SPECIALITIES_SUGGESTIONS });
}

export function clearSpecialitySelectedSuggestion() {
  return dispatch => {
    dispatch({
      type: '@@redux-form/CHANGE',
      meta: {
        form: 'employment',
        field: 'speciality',
        touch: false,
        persistentSubmitErrors: false
      },
      payload: ''
    });
  };
}

export function specialitySelected(data) {
  return dispatch => {
    dispatch({
      type: '@@redux-form/CHANGE',
      meta: {
        form: 'employment',
        field: 'speciality',
        touch: true,
        active: false
      },
      payload: data.name
    });
    dispatch({
      type: '@@redux-form/CHANGE',
      meta: {
        form: 'employment',
        field: 'specialityId',
      },
      payload: data.id
    });
  };
}
