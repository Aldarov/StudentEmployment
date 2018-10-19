import { fetchingStart, fetchingEnd } from '../modules/busyIndicator';

export default function fetching(fetchingName, action, errorAction) {
  return async dispatch => {
    dispatch(fetchingStart(fetchingName));
    try {
      await action(dispatch);
    } catch (error) {
      if (errorAction)
        errorAction(dispatch, error);
    }
    dispatch(fetchingEnd(fetchingName));
  };
}
