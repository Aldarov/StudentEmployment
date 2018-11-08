import React, { Component } from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import MenuItem from '@material-ui/core/MenuItem';

class Option extends Component {
  render() {
    const {
      innerRef, isFocused, isSelected, innerProps, children
    } = this.props;

    return (
      <MenuItem
        buttonRef={innerRef}
        selected={isFocused}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
        {...innerProps}
      >
        {children}
      </MenuItem>
    );
  }
}

export default compose(
  onlyUpdateForKeys([]),
)(Option);
