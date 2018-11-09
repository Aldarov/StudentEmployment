import React from 'react';
import PropTypes from 'prop-types';

const LoadingMessage = (props) => (
  <div style={props.getStyles('loadingMessage', props)}>
    Загрузка...
  </div>
);

LoadingMessage.propTypes = {
  getStyles: PropTypes.func,
};


export default LoadingMessage;
