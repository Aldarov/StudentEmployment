import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '../Autocomplete';

export default function RenderAutocomplete ({
  input,
  meta: {touched, error },
  ...custom
}) {
  return (
    <Autocomplete
      {...input}
      error={touched && Boolean(error)}
      helperText={error}
      {...custom}
    />
  );
}

RenderAutocomplete.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};
