import { connect } from 'react-redux';
import { compose, onlyUpdateForKeys } from 'recompose';

import QuestionDialog from './QuestionDialog';
import { openDialogSelector, argsDialogSelector } from './selectors';

const mapStateToProps = (state, props) => {
  return {
    open: openDialogSelector(state, props),
    args: argsDialogSelector(state, props),
    title: props.title,
    contentText: props.contentText,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onYes: args => () => props.onYes(args),
    onNo: () => props.onNo()
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForKeys(['open', 'args', 'title', 'contentText'])
)(QuestionDialog);

