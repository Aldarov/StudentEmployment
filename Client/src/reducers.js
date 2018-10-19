import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { busyIndicatorReducer } from './_global/modules/busyIndicator';
import { sidebarReducer } from './_global/modules/sidebar';
import { authReducer } from './_global/modules/auth';
import { dialogReducer } from './_global/modules/dialogs';

// import { dictionariesReducer } from './modules/layout';

// import { employmentListReducer } from './modules/employmentList';
// import { employmentReducer } from './modules/employment';
// import { organizationListReducer } from './modules/organizationList';
// import { organizationReducer } from './modules/organization';


const reducer = combineReducers({
  isAuth: authReducer,
  fetching: busyIndicatorReducer,
  sidebar: sidebarReducer,
  dialogs: dialogReducer,
  form: formReducer,
});

export default reducer;
