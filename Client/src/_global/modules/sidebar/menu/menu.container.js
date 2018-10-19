import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose, onlyUpdateForKeys } from 'recompose';

import { CLOSE_SIDEBAR } from '../../../constants';
import Menu from './Menu';
import menuRoutes from './menuRoutes';

const mapStateToProps = () => {
  return {
    routes: menuRoutes
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onRedirect: url => () => {
      props.history.push(url);
      dispatch({ type: CLOSE_SIDEBAR });
    }
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForKeys([])
)(Menu);
