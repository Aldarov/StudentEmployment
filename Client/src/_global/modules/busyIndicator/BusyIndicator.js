import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const BusyIndicator = ({ show, classes }) => {
  return (
    show ?
      <div className={classes.progress}>
        <CircularProgress/>
      </div>
      : null
  );
};

BusyIndicator.propTypes = {
  classes: PropTypes.object,
  show: PropTypes.bool.isRequired,
};

export default withStyles(() => ({
  progress: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 70, 175, 0.1)',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}))(BusyIndicator);
