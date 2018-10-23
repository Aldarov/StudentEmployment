import { connect } from 'react-redux';
import { compose, lifecycle, onlyUpdateForKeys } from 'recompose';

import Main from './Main';
import { loadData, loadData2 } from './main.actions';
import { openQuestionDialog } from '../../_global/modules/dialogs';

const mapStateToProps = () => {
  return {
    // modalDialogOpened, modalDialogOnClose, modalDialogTitle
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadData: () => {
      dispatch(loadData2('param1', 'param2'));
    },

    onDialogOpen: id => () => dispatch(openQuestionDialog('OPEN_DIALOG', id)),
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
