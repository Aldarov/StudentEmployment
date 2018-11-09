import React from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/lib/Async';
import { withStyles } from '@material-ui/core/styles';

import NoOptionsMessage from './сomponents/NoOptionsMessage';
import Control from './сomponents/Control';
import Option from './сomponents/Option';
import Placeholder from './сomponents/Placeholder';
import SingleValue from './сomponents/SingleValue';
import MultiValue from './сomponents/MultiValue';
import ValueContainer from './сomponents/ValueContainer';
import Menu from './сomponents/Menu';
import LoadingMessage from './сomponents/LoadingMessage';

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  LoadingMessage
};

const Autocomplete  = ({
  classes, className, theme,
  value, onChange,
  onStartLoadOptions,
  placeholder,
  label,
  error, helperText,
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
    error,
    helperText,
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
      loadOptions={onStartLoadOptions}
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

Autocomplete.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  theme: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.object,
  onStartLoadOptions: PropTypes.func,
  onChange: PropTypes.func,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  props: PropTypes.object,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default withStyles(() => ({}), { withTheme: true })(Autocomplete);
