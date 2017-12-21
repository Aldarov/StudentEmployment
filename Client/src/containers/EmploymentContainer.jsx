import { connectAdvanced } from 'react-redux';
import {
  SubmissionError, reduxForm, getFormValues, submit, isPristine, isSubmitting, change
} from 'redux-form';

import Employment from '../components/Employment';
import {
  initEmploymentForm,
  getSpecialitiesSuggestion, clearSpecialitiesSuggestion,
  openQuestionDialog, closeQuestionDialog,
  openEmploymentContract, closeEmploymentContract,
  getSchoolsSuggestion, clearSchoolsSuggestion,
  getOrganizationsSuggestion, clearOrganizationsSuggestion
} from '../actions';

const formName = 'employment';
let successSubmit = null;

export default connectAdvanced( dispatch => (state, ownProps) => {
  const { id } = ownProps.match.params;
  const formValues = getFormValues(formName)(state);
  const pristine = isPristine(formName)(state);
  const submitting = isSubmitting(formName)(state);

  ownProps.onInitHeader({
    onLeftButtonClick: () => {
      if (!pristine) {
        ownProps.onInitDialog({
          contentText: 'Сохранить измененные данные?',
          onYes: () => {
            successSubmit = () => {
              ownProps.history.push('/employment');
              successSubmit = null;
            };
            dispatch(closeQuestionDialog());
            dispatch(submit(formName));
          },
          onNo: () => {
            dispatch(closeQuestionDialog());
            ownProps.history.push('/employment');
          }
        });
        dispatch(openQuestionDialog());
      } else {
        ownProps.history.push('/employment');
      }
    },
    leftButtonIconName: 'ArrowBack',
    onRightButtonClick: () => dispatch(submit(formName)),
    rightButtonDisabled: pristine || submitting,
    title: `Трудоустройство № ${id}`
  });

  const props = {
    loading: state.fetching,
    specialities: state.employment.edit.specialitySuggestions,
    eduForms: state.dictionaries.eduForms,

    students: formValues && formValues.pgContractStuffs,
    directionTypes: state.dictionaries.directionTypes,
    distributionTypes: state.dictionaries.distributionTypes,
    columnsStudents: [
      { name: 'fullName', title: 'ФИО' },
      { name: 'regAddress', title: 'Адрес регистрации' },
      { name: 'finance', title: 'Финансирование' },
      { name: 'entrType', title: 'Способ поступления' },
      { name: 'phone', title: 'Телефон' },
      { name: 'direction', title: 'Распределен' },
      { name: 'distribution', title: 'Трудоустроен' },
    ],
    listColumnWidthsStudents: { fullName: 250, regAddress: 300, finance: 120, entrType: 150, phone: 150, direction: 250, distribution: 250 },
    contract: state.employment.edit.currentContract,
    schoolsSuggestions: state.employment.edit.schoolsSuggestions,
    organizationsSuggestions: state.employment.edit.organizationsSuggestions
  };

  const methods = {
    onLoadData: () => {
      dispatch(initEmploymentForm(formName, id));
    },

    onGetSpecialitySuggestions: value => dispatch(getSpecialitiesSuggestion({ limit: 7, search: value, sorting: [{columnName: 'name'}] })),
    onClearSpecialitySuggestions: () => dispatch(clearSpecialitiesSuggestion()),
    onClearSpecialitySelectedSuggestion: () => {
      dispatch(change(formName, 'speciality', ''));
      dispatch(change(formName, 'specialityId', null));
    },
    onSpecialitySelected: data => {
      dispatch(change(formName, 'speciality', data.name));
      dispatch(change(formName, 'specialityId', data.id));
    },

    onCloseContract: () => dispatch(closeEmploymentContract()),

    onGetSchoolsSuggestions: value => dispatch(getSchoolsSuggestion({ limit: 7, search: value, sorting: [{columnName: 'name'}] })),
    onClearSchoolsSuggestions: () => dispatch(clearSchoolsSuggestion()),
    onSchoolSelected: (row, type) => data => {
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolName', data.name));
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolId', data.id));
    },
    onClearSchoolSelected: (row, type) => () => {
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolName', ''));
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'SchoolId', null));
    },

    onGetOrganizationsSuggestions: value => dispatch(getOrganizationsSuggestion({ limit: 7, search: value, sorting: [{columnName: 'name'}] })),
    onClearOrganizationsSuggestions: () => dispatch(clearOrganizationsSuggestion()),
    onOrganizationSelected: (row, type) => data => {
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationName', data.name));
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationId', data.id));
    },
    onClearOrganizationSelected: (row, type) => () => {
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationName', ''));
      dispatch(change(formName, 'pgContractStuffs['+row+'].'+type+'OrganizationId', null));
    },

    onDoActionStudents: (args) => {
      switch (args.type) {
        case 'adding': {
          break;
        }
        case 'editing': {
          const {
            directionSchoolId, directionOrganizationId,
            distributionSchoolId, distributionOrganizationId
          } = formValues.pgContractStuffs[args.tableRow];

          dispatch(openEmploymentContract(args.row.student.fullName, args.tableRow,
            Boolean(directionSchoolId), Boolean(directionOrganizationId),
            Boolean(distributionSchoolId), Boolean(distributionOrganizationId)
          ));
          break;
        }
        case 'deleting': {

          break;
        }
      }
    },
    onSubmit: (values) => {
      console.log('onSubmit', values);
      // successSubmit && successSubmit();
      throw new SubmissionError({
        entraceYear: 'Ошибка заполнения',
        _error: 'Общая ошибка формы!!'
      });
    },
    validate: (values) => {
      const errors = {};
      const requiredFields = [ 'entraceYear', 'docDate', 'speciality' ];
      requiredFields.forEach(field => {
        if (!values[field]) {
          errors[field] = 'Заполните данное поле';
        }
      });

      return errors;
    }
  };

  return { ...props, ...methods, ...ownProps };
})(
  reduxForm({
    form: formName
  })(Employment)
);
