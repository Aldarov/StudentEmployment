import { connect } from 'react-redux';
import { compose, lifecycle, onlyUpdateForKeys } from 'recompose';

import Main from './Main';
import { loadData, loadData2 } from './main.actions';

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadData: () => {
      dispatch(loadData2('param1', 'param2'));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.onLoadData();
    }
  }),
  onlyUpdateForKeys([]),
)(Main);
