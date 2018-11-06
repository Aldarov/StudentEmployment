import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, onlyUpdateForKeys } from 'recompose';
import AsyncSelect from 'react-select/lib/Async';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import NoOptionsMessage from './selectComponents/NoOptionsMessage';
import Control from './selectComponents/Control';
import Option from './selectComponents/Option';
import Placeholder from './selectComponents/Placeholder';
import SingleValue from './selectComponents/SingleValue';
import MultiValue from './selectComponents/MultiValue';
import ValueContainer from './selectComponents/ValueContainer';
import Menu from './selectComponents/Menu';

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
  const textFieldProps ={
    label,
    InputLabelProps: {
      shrink: true,
    },
  };

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
  connect((_, props) => ({ props })),
  onlyUpdateForKeys([]),
  withStyles(theme => ({
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
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
