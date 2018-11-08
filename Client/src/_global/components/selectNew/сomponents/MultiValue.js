import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import classNames from 'classnames';
import { emphasize } from '@material-ui/core/styles/colorManipulator';


const MultiValue = (props) => {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.classes.chip, {
        [props.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
};

export default compose(
  onlyUpdateForKeys([]),
  withStyles(theme => ({
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
        0.08,
      ),
    },
  }))
)(MultiValue);
