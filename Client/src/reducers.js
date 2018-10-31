import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { busyIndicatorReducer } from './_global/modules/busyIndicator';
import { sidebarReducer } from './_global/modules/sidebar';
import { authReducer } from './_global/modules/auth';
import { dialogReducer } from './_global/modules/dialogs';
import { dictionariesReducer } from './_global/modules/dictionaries';
import { organizationListReducer } from './modules/organizationList';

// import { organizationReducer } from './modules/organization';
// import { employmentListReducer } from './modules/employmentList';
// import { employmentReducer } from './modules/employment';


const reducer = combineReducers({
  isAuth: authReducer,
  fetching: busyIndicatorReducer,
  sidebar: sidebarReducer,
  dictionaries: dictionariesReducer,
  organization: organizationListReducer,
  dialogs: dialogReducer,
  form: formReducer,
});

export default reducer;
