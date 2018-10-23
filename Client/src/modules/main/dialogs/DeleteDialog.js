import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForKeys } from 'recompose';
import { connect } from 'react-redux';

import { openQuestionDialog, closeQuestionDialog } from '../../../_global/modules/dialogs';
import { QuestionDialog } from '../../../_global/modules/dialogs';

const DeleteDialog = ({ onDialogYes, onDialogNo }) => {
  return (
    <QuestionDialog
      dialogName={'OPEN_DIALOG'}
      title={'Вопрос'}
      contentText={'Удалить?'}
      onYes={onDialogYes}
      onNo={onDialogNo}
    />
  );
};

DeleteDialog.propTypes = {
  onDialogYes: PropTypes.func,
  onDialogNo: PropTypes.func,
};


export default compose(
  connect(null, (dispatch) => ({
    onDialogYes: id => {
      console.log('onDialogYes', id);
      dispatch(closeQuestionDialog('OPEN_DIALOG'));
    },
    onDialogNo: () => dispatch(closeQuestionDialog('OPEN_DIALOG'))
  })),
  onlyUpdateForKeys([]),
)(DeleteDialog);
