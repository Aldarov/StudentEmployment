import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const NoOptionsMessage = (props) => {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      Нет данных
    </Typography>
  );
};

export default compose(
  onlyUpdateForKeys([]),
  withStyles(theme => ({

  }))
)(NoOptionsMessage);
