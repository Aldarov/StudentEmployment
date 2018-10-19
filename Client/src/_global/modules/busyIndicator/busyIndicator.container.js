import { connect } from 'react-redux';
import { compose, onlyUpdateForKeys } from 'recompose';

import BusyIndicator from './BusyIndicator';
import { fetchingSelector } from './selectors';

const mapStateToProps = (state, props) => {
  return {
    show: fetchingSelector(state, props)
  };
};

export default compose(
  connect(mapStateToProps),
  onlyUpdateForKeys(['show'])
)(BusyIndicator);
