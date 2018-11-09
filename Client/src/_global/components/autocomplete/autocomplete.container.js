import { connect } from 'react-redux';
import { compose, onlyUpdateForKeys } from 'recompose';
import _ from 'lodash';

import Autocomplete from './Autocomplete';

const mapStateToProps = (_, props) => {
  return {
    props: props
  };
};

const debounceAction = _.debounce((action, ...props) => {
  action(...props);
}, 500);

const mapDispatchToProps = (_, props) => {
  return {
    onStartLoadOptions: (value, callback) => debounceAction(props.onLoadOptions, value, callback)
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForKeys([]),
)(Autocomplete);
