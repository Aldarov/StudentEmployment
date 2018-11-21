import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose, onlyUpdateForKeys } from 'recompose';
import { createSelector } from 'reselect';

import { CLOSE_SIDEBAR } from '../../../constants';
import Menu from './Menu';
import menuRoutes from './menuRoutes';

const routesSelector = createSelector([() => menuRoutes], menuRoutes => menuRoutes);

const mapStateToProps = () => {
  return {
    routes: routesSelector()
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
