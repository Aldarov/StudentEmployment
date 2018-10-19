import { apiLogin, apiLogout, apiIsAuth } from './auth.api';
import { LOGIN, LOGOUT } from '../../constants';
import fetching from '../../helpers/fetching';

export function login(args) {
  return fetching('onLogin',
    async dispatch => {
      const res = await apiLogin(args);
      dispatch({ type: LOGIN });
      return res;
    }
  );
}

export function logout() {
  return dispatch => {
    apiLogout();
    dispatch({ type: LOGOUT });
  };
}

export function checkAuth() {
  return dispatch => {
    if (apiIsAuth()) {
      dispatch({ type: LOGIN });
    } else {
      dispatch({ type: LOGOUT });
    }
  };
}
