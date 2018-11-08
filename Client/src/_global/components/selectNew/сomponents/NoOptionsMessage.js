import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const NoOptionsMessage = (props) => {
  return (
    <Typography
      color="textSecondary"
      className={props.classes.noOptionsMessage}
    >
      Нет данных
    </Typography>
  );
};

NoOptionsMessage.propTypes = {
  classes: PropTypes.object,
};

export default compose(
  onlyUpdateForKeys([]),
  withStyles(theme => ({
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
  }))
)(NoOptionsMessage);
