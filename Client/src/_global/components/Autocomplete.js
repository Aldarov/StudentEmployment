import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForKeys, lifecycle, withState, withHandlers } from 'recompose';
import Autosuggest from 'react-autosuggest';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import _ from 'lodash';

import IconBtn from './IconBtn';

function renderInput(inputProps) {
  const {
    className, value, onChange, ref, label,
    error, helperText,
    onClearSelectSuggestion, inputDisable,
    hideIcon,
    ...other
  } = inputProps;

  return (
    <FormControl className={className}
      error={error}
    >
      <InputLabel>{label}</InputLabel>
      <Input
        type='select'
        disabled={inputDisable}
        error={error}
        inputRef={ref}
        value={value || ''}
        onChange={onChange}
        endAdornment={
          hideIcon ? null :
            <InputAdornment position="end">
              <IconBtn iconName='ClearIcon' onClick={onClearSelectSuggestion} />
            </InputAdornment>
        }
        {...other}
      />
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem
      selected={isHighlighted}
      component="div"
    >
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span
              key={index}
              style={{ fontWeight: 'bold' }}>
              {part.text}
            </span>
          ) : (
            <strong key={index} style={{ fontWeight: 'normal' }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <List {...containerProps}>
      {children}
    </List>
  );
}

const Autocomplete = ({
  id, classes, className,
  suggestions, onSuggestionsClearRequested,
  inputProps: {...inputProps},
  value, inputDisable,
  handleGetSuggestionValue,
  handleChange,
  handleClearSelectSuggestion,
  handleSuggestionsFetchRequested,
  handleSuggestionSelected
}) => {
  return (
    <div className={className}>
      <Autosuggest
        id={id}
        theme={{
          container: classes.container,
          root: classes.root,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={handleGetSuggestionValue}
        inputProps={{
          value: value,
          onChange: handleChange,
          onClearSelectSuggestion: handleClearSelectSuggestion,
          inputDisable: inputDisable,
          ...inputProps
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={handleSuggestionSelected}
      />
    </div>
  );
};

Autocomplete.propTypes = {
  id: PropTypes.string,
  inputProps: PropTypes.object,
  value: PropTypes.string,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,

  //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }
  suggestions: PropTypes.array,

  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,

  onSuggestionSelected: PropTypes.func,
  onClearSelectedSuggestion: PropTypes.func,

  inputDisable: PropTypes.bool,
  handleGetSuggestionValue: PropTypes.func,
  handleChange: PropTypes.func,
  handleClearSelectSuggestion: PropTypes.func,
  handleSuggestionsFetchRequested: PropTypes.func,
  handleSuggestionSelected: PropTypes.func,
};

export default compose(
  onlyUpdateForKeys(['inputProps', 'value', 'suggestions']),
  lifecycle({
    getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.inputProps && nextProps.inputProps.value && prevState.firstReceiveProps) {
        return { firstReceiveProps: false };
      }
      return null;
    }
  }),
  withState('value', 'setValue', ''),
  withState('inputDisable', 'setInputDisable', false),
  withState('firstReceiveProps', 'setFirstReceiveProps', true),
  withHandlers({
    handleChange: ({ setValue }) => (event, { newValue }) => setValue(newValue),
    handleSuggestionSelected: ({ setValue }) => (event, {suggestion}) => {
      if (suggestion && suggestion.id) {
        this.props.onSuggestionSelected(suggestion);
        // setInputDisable(true);
        setValue(suggestion.name);
      }
    },
    handleGetSuggestionValue: () => suggestion => suggestion.name,
    debounceSuggestionsFetch: () => _.debounce((val) => {
      this.props.onSuggestionsFetchRequested(val);
    }, 500),
    handleSuggestionsFetchRequested: () => ({ value }) => this.debounceSuggestionsFetch(value),
    handleClearSelectSuggestion: ({ setValue, setInputDisable }) => () => {
      this.props.onClearSelectedSuggestion();
      setValue('');
      setInputDisable(false);
    }
  }),
  withStyles(theme => ({
    container: {
      flexGrow: 1,
      position: 'relative',
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      left: 0,
      right: 0,
      width: 'auto',
      maxHeight: 300,
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      border: '1px solid #eee',
      zIndex: 999999
    },
    suggestion: {
      display: 'block',
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
    root: {
      width: '100%',
    },
    renderInput: {
      display: 'flex',
    },
    clearIcon:{
      alignSelf: 'center'
    }
  }))
)(Autocomplete);
