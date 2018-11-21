import { connect } from 'react-redux';
import { compose, onlyUpdateForKeys } from 'recompose';

import Layout from './Layout';
import { openSidebar } from '../sidebar';
import appConfig from '../../../app.config';

const mapStateToProps = () => {
  return {
    appTitle: appConfig.title,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDefaultHeaderLeftButtonClick: () => dispatch(openSidebar()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForKeys([])
)(Layout);
