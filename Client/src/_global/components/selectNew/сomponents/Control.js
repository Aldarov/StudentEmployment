import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForKeys } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const inputComponent = ({ inputRef, ...props }) => {
  return <div {...props} ref={inputRef}/>;
};

class Control extends Component {
  render() {
    const { classes, innerRef, innerProps: { onMouseDown }, children } = this.props;

    const inputProps = {
      inputComponent,
      inputProps: {
        className: classes.input,
        inputRef: innerRef,
        children: children,
        onMouseDown: onMouseDown
      }
    };

    return (
      <TextField
        fullWidth
        InputProps={inputProps}
        {...this.props.selectProps.textFieldProps}
      />
    );
  }
}

Control.propTypes = {
  classes: PropTypes.object,
  selectProps: PropTypes.object,
  innerRef: PropTypes.func,
  innerProps: PropTypes.object,
  children: PropTypes.any,
};

export default compose(
  onlyUpdateForKeys(['children']),
  withStyles(() => ({
    input: {
      display: 'flex',
      padding: 0,
    },
  }))
)(Control);
