import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function QuestionDialog(props) {
  const { open, args, title, contentText, onYes, onNo } = props;

  return (
    contentText ?
      <Dialog
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{ title }</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{ contentText }</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onYes(args)} color="primary">
            Да
          </Button>
          <Button onClick={onNo} color="primary" autoFocus>
            Нет
          </Button>
        </DialogActions>
      </Dialog>
      : null
  );
}

QuestionDialog.propTypes = {
  open: PropTypes.bool,
  args: PropTypes.any,
  title: PropTypes.string,
  contentText: PropTypes.string,
  onYes: PropTypes.func,
  onNo: PropTypes.func,
};

