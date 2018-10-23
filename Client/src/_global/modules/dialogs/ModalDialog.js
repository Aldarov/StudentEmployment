import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ModalDialog = ({ classes, onClose, opened, title, children }) => {
  return (
    <Dialog
      fullScreen
      open={opened}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex}>{ title }</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        {children}
      </div>
    </Dialog>
  );
};

ModalDialog.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func,
  opened: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.any,
};

export default withStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  content: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
}))(ModalDialog);
