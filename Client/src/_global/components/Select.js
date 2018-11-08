import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, onlyUpdateForKeys } from 'recompose';
import classNames from 'classnames';
import AsyncSelect from 'react-select/lib/Async';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import Option from './selectNew/selectComponents/Option';
import Menu from './selectNew/selectComponents/Menu';
import Control from './selectNew/selectComponents/Control';

function NoOptionsMessage(props) {
  console.log('Render NoOptionsMessage', props);
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      Нет данных
    </Typography>
  );
}

// function inputComponent({ inputRef, ...props }) {
//   console.log('Render inputComponent', inputRef, props);
//   return <div ref={inputRef} {...props} />;
// }

// function Control(props) {
//   console.log('Render Control', props);
//   return (
//     <TextField
//       fullWidth
//       InputProps={{
//         inputComponent,
//         inputProps: {
//           className: props.selectProps.classes.input,
//           inputRef: props.innerRef,
//           children: props.children,
//           ...props.innerProps,
//         },
//       }}
//       {...props.selectProps.textFieldProps}
//     />
//   );
// }

// function Option(props) {
//   console.log('Render Option', props);
//   return (
//     <MenuItem
//       buttonRef={props.innerRef}
//       selected={props.isFocused}
//       component="div"
//       style={{
//         fontWeight: props.isSelected ? 500 : 400,
//       }}
//       {...props.innerProps}
//     >
//       {props.children}
//     </MenuItem>
//   );
// }

function Placeholder(props) {
  console.log('Render Placeholder', props);
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  console.log('Render SingleValue', props);
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  console.log('Render ValueContainer', props);
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}
ValueContainer.propTypes = {
  selectProps: PropTypes.object,
  children: PropTypes.any,
};

function MultiValue(props) {
  console.log('Render MultiValue', props);
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

// function Menu(props) {
//   console.log('Render Menu', props);
//   return (
//     <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
//       {props.children}
//     </Paper>
//   );
// }

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const Select  = ({
  classes, className, theme,
  value, onChange,
  onLoadOptions,
  placeholder,
  label,
  isDisabled,
  props
}) => {
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };
  const textFieldProps = {
    label,
    InputLabelProps: {
      shrink: true,
    },
  };
  console.log('Render Select', props);

  return (
    <AsyncSelect
      className={className}
      classes={classes}
      styles={selectStyles}
      components={components}
      placeholder={placeholder}
      loadOptions={onLoadOptions}
      onChange={onChange}
      value={value}
      textFieldProps={textFieldProps}
      isDisabled={isDisabled}
      cacheOptions
      isClearable
      {...props}
    />
  );
};

Select.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  theme: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.object,
  onLoadOptions: PropTypes.func,
  onChange: PropTypes.func,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  props: PropTypes.object,
};

export default compose(
  connect((_, props) => ({ props: props })),
  onlyUpdateForKeys([]),
  withStyles(theme => ({
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
        0.08,
      ),
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
  }), { withTheme: true })
)(Select);
