import {
  initialize,
  getFormValues,
  change,
  touch,
} from 'redux-form';
import isEmpty from 'lodash/isEmpty';

import {

} from './header.actions';
import { fetching } from '../../busyIndicator';
import {
  apiGetEmploymentById,
  apiPostEmployment,
} from '../employment.api';
import { apiGetSpecialities, getProfiles } from '../../layout';
import {
  formName,
}  from '../employment.container';
import { openQuestionDialog, closeQuestionDialog } from '../../dialogs';

import { onLoadStudents, addStudents, onCloseStudentsSelection, onStudentsSelected } from './students.actions';
import {
  onCloseContract,
  closeEmploymentContract,
  openEmploymentContract,
  onChangeContractDirectionType,
  DELETE_EMPLOYMENT_CONTRACT_DIALOG,
  onDelContractYes,
  onDelContractNo
} from './contract.actions';
import { onHeaderLeftButtonClick } from './header.actions';
import {
  onGetSpecialitySuggestions,
  onClearSpecialitySuggestions,
  onClearSpecialitySelectedSuggestion,
  onSpecialitySelected
} from './speciality.actions';
import {
  onGetSchoolsSuggestions,
  onClearSchoolsSuggestions,
  onSchoolSelected,
  onClearSchoolSelected
} from './school.actions';
import {
  onGetOrganizationsSuggestions,
  onClearOrganizationsSuggestions,
  onOrganizationSelected,
  onClearOrganizationSelected
} from './organization.actions';
import { onShowDistributionReport, onShowEmploymentReport } from './reports.actions';
import throwError from '../../_global/helpers/throwError';

const CONFIRM_SAVE_EMPLOYMENT_DIALOG = 'CONFIRM_SAVE_EMPLOYMENT_DIALOG';

const onEmploymentLoadData = (id) => () => (dispatch) => {
  dispatch(onCloseStudentsSelection());
  dispatch(closeEmploymentContract());
  dispatch(initEmploymentForm(id, formName));
};

const initEmploymentForm = (id) => {
  return dispatch => {
    if (!id) {
      const result = {
        specialityId: null,
        entraceYear: null,
        eduFormId: null,
        docDate: null,
        pgContractStuffs: [],
        speciality: '',
        specializationId: 0,
      };
      dispatch(initialize(formName, result, false, { keepSubmitSucceeded: true }));
      return result;
    } else {
      return fetching(dispatch, formName,
        apiGetEmploymentById(id).then(res =>
          apiGetSpecialities({ id: res.specialityId }).then(spec => {
            const speciality = (spec.data[0] && spec.data[0].name) || '';
            res.pgContractStuffs = res.pgContractStuffs.sort(function (a, b) {
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
            let result = { ...res, speciality };
            if (!result.specializationId)
              result = {...result, specializationId: 0 };

            return dispatch(getProfiles(res.specialityId, { sorting: [{columnName: 'specialityID'}, {columnName: 'name'}] }))
              .then(() => {
                dispatch(initialize(formName, result, false, { keepSubmitSucceeded: true }));
                return result;
              });
          })
        )
      );
    }
  };
};

const onDoAction = (args) => (dispatch) => {
  switch (args.type) {
    case 'adding': {
      dispatch(addStudents());
      break;
    }
    case 'editing': {
      dispatch(openEmploymentContract(args.row.student.fullName, args.tableRow));
      break;
    }
    case 'deleting': {
      dispatch(openQuestionDialog(DELETE_EMPLOYMENT_CONTRACT_DIALOG, args));
      break;
    }
  }
};

const saveEmployment = (data) => dispatch => {
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
  if (res.specializationId == 0) res.specializationId = null;
  return fetching(dispatch, formName, apiPostEmployment(res));
};

const saveData = (history, redirectToList) => values => async dispatch => {
  const res = await dispatch(saveEmployment(values));
  throwError(res);

  if (redirectToList) {
    history.push('/employment');
  } else {
    dispatch(initialize(formName, values));
    dispatch(change(formName, 'id', res.id));
    history.push(`/employment/${res.id}`);
  }
  return res;
};

const validate = values => (dispatch, getState) => {
  const state = getState();
  values = values || getFormValues(formName)(state);
  const errors = {};

  const requiredFields = [ 'specialityId', 'entraceYear', 'docDate', 'eduFormId', 'specializationId' ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      if (field == 'specialityId') {
        errors['speciality'] = 'Заполните данное поле';
      } else if (field == 'specializationId') {
        if (state.dictionaries.profiles.some(item => item.id != 0))
          errors['specializationId'] = 'Заполните данное поле';
      }
      else {
        errors[field] = 'Заполните данное поле';
      }
    }
  });

  if (values.entraceYear && isNaN(Number(values.entraceYear))) {
    errors.entraceYear = 'Год должен быть числом';
  }

  // if (values.pgContractStuffs && values.pgContractStuffs.length == 0) {
  //   errors['_error'] = 'Пожалуйста, загрузите студентов';
  // }
  return errors;
};

const onSaveYes = (history) => () => (dispatch, getState) => {
  dispatch(closeQuestionDialog(CONFIRM_SAVE_EMPLOYMENT_DIALOG));
  const state = getState();
  const values = getFormValues(formName)(state);
  const errors = dispatch(validate(values));
  if (isEmpty(errors)) {
    dispatch(saveData(history, true)(values));
  } else {
    for (var err in errors) {
      dispatch(touch(formName, err));
    }
  }
};

const onSaveNo = (history) => () => (dispatch) => {
  dispatch(closeQuestionDialog(CONFIRM_SAVE_EMPLOYMENT_DIALOG));
  history.push('/employment');
};

export {
  onEmploymentLoadData,
  onHeaderLeftButtonClick,

  onGetSpecialitySuggestions,
  onClearSpecialitySuggestions,
  onClearSpecialitySelectedSuggestion,
  onSpecialitySelected,

  onGetSchoolsSuggestions,
  onClearSchoolsSuggestions,
  onSchoolSelected,
  onClearSchoolSelected,

  onGetOrganizationsSuggestions,
  onClearOrganizationsSuggestions,
  onOrganizationSelected,
  onClearOrganizationSelected,

  onCloseContract,
  onChangeContractDirectionType,

  onDoAction,

  onLoadStudents,
  onCloseStudentsSelection,
  onStudentsSelected,

  saveData,
  validate,

  onShowDistributionReport,
  onShowEmploymentReport,

  CONFIRM_SAVE_EMPLOYMENT_DIALOG,
  DELETE_EMPLOYMENT_CONTRACT_DIALOG,
  onSaveYes,
  onSaveNo,
  onDelContractYes,
  onDelContractNo
};