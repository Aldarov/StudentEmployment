import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const Menu = (props) => {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
};

// export default compose(
//   onlyUpdateForKeys([]),
//   withStyles(theme => ({
//     paper: {
//       position: 'absolute',
//       zIndex: 1,
//       marginTop: theme.spacing.unit,
//       left: 0,
//       right: 0,
//     }
//   })),
// )(Menu);

export default onlyUpdateForKeys([])(Menu);
