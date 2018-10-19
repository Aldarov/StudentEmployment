import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from '../../constants';

const defaultData = {
  open: false,
};

export default function sidebarReducer(state = defaultData, action) {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        ...state,
        open: true
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}
