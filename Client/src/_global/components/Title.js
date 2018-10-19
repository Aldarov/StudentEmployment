import React from 'react';
import PropTypes from 'prop-types';
import { compose, onlyUpdateForKeys } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const Title = ({ classes, className, title }) => {
  return (
    <div className={classNames(classes.title, className)}>
      {title}
    </div>
  );
};

Title.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default compose(
  onlyUpdateForKeys(['title']),
  withStyles(() => ({
    title: {
      color: 'white',
      fontSize: '1.4em'
    },
  }))
)(Title);
