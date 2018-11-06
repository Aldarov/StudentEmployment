import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const InputComponent = ({ inputRef, ...props }) => {
  return (
    <div ref={inputRef} {...props} />
  );
};

const Control = (props) => {
  return (
    <TextField
      fullWidth
      InputProps={{
        InputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
};


// export default compose(
//   // onlyUpdateForKeys([]),
//   withStyles(() => ({
//     input: {
//       display: 'flex',
//       padding: 0,
//     },
//   }))
// )(Control);
export default onlyUpdateForKeys([])(Control);
