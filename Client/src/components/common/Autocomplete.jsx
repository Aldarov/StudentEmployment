import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import _ from 'lodash';
import classNames from 'classnames';

function renderInput(inputProps) {
  const { classes, style, home, value, ref, onClearSelectSuggestion, inputDisable, ...other } = inputProps;

  return (
    <div className={classNames(classes.renderInput, style)}>
      <TextField
        disabled={inputDisable}
        autoFocus={home}
        className={classes.textField}
        value={value}
        inputRef={ref}
        InputProps={{
          classes: {
            input: classes.input,
          },
          ...other,
        }}
      />
      <IconButton disabled={!value} onClick={onClearSelectSuggestion} >
        <ClearIcon />
      </IconButton>
    </div>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={index} style={{ fontWeight: 700 }}>
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
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    margin: 5,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
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
  textField: {
    width: '100%',
  },
  renderInput: {
    display: 'flex',
  }
});

class Autocomplete extends React.Component {
  state = {value: '', inputDisable: false };

  handleChange = (event, { newValue }) => {
    this.props.onChangeValue(newValue);
    // this.setState({ value: newValue });
  };

  handleSuggestionSelected = (event, {suggestion}) => {
    if (suggestion && suggestion.id) {
      this.setState({ inputDisable: true });
      this.props.onSuggestionSelected(suggestion.id);
    }
  }

  handleGetSuggestionValue = (suggestion) => {
    return suggestion.name;
  }

  debounceSuggestionsFetch = _.debounce((val) => {
    this.props.onSuggestionsFetchRequested(val);
  }, 500);

  handleSuggestionsFetchRequested = ({ value }) => {
    this.debounceSuggestionsFetch(value);
  }

  handleClearSuggestionSelected = () => {
    this.props.onClearSuggestionSelected();
    // this.setState({ value: '', inputDisable: false });
    this.setState({ inputDisable: false });
  }

  render() {
    const {
      classes, value, style, placeholder, suggestions, onSuggestionsClearRequested
    } = this.props;
    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={suggestions}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderSuggestion={renderSuggestion}
        inputProps={{
          autoFocus: true,
          classes,
          style,
          placeholder,
          value: value,
          onChange: this.handleChange,
          onClearSelectSuggestion: this.handleClearSuggestionSelected,
          inputDisable: this.state.inputDisable
        }}
        getSuggestionValue={this.handleGetSuggestionValue}
        onSuggestionSelected={this.handleSuggestionSelected}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
      />
    );
  }
}

Autocomplete.propTypes = {
  value: PropTypes.string,
  onChangeValue: PropTypes.func,
  style: PropTypes.string,
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  suggestions: PropTypes.array,   //suggestions - должен быть массив объектов типа: { id: <id>, name: <name> }
  onSuggestionsFetchRequested: PropTypes.func,
  onSuggestionsClearRequested: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
  onClearSuggestionSelected: PropTypes.func,
};

export default withStyles(styles)(Autocomplete);
