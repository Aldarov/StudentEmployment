import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { compose, onlyUpdateForKeys } from 'recompose';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuth === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: {from: props.location} }}/>
  )}/>
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

export default compose(
  connect((state, props) => ({
    isAuth: state.isAuth,
    ...props
  })),
  onlyUpdateForKeys(['isAuth']),
)(PrivateRoute);
