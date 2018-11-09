import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const SingleValue = (props) => {
  return (
    <Typography className={props.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
};

export default compose(
  onlyUpdateForKeys([]),
  withStyles(() => ({
    singleValue: {
      fontSize: 16,
    },
  }))
)(SingleValue);
