import { connect } from 'react-redux';
import { compose, onlyUpdateForKeys } from 'recompose';

import Sidebar from './Sidebar';
import { closeSidebar } from './sidebar.actions';

const mapStateToProps = (state) => {
  return {
    show: state.sidebar.open
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => dispatch(closeSidebar())
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForKeys(['show'])
)(Sidebar);
