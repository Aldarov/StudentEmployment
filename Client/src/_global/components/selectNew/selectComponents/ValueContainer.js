import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const ValueContainer = (props) => {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
};

ValueContainer.propTypes = {
  selectProps: PropTypes.object,
  children: PropTypes.any,
};

export default compose(
  onlyUpdateForKeys([]),
  withStyles(theme => ({

  }))
)(ValueContainer);
