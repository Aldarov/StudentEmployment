import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

import { Layout } from '../layout';

const Login = ({ classes, isAuth, location }) => {
  const from = (location && location.state && location.state.from) || { pathname: '/' };

  return (
    isAuth
      ? <Redirect to={from}/>
      : <Layout
        headerVisiable={false}
      >
        <div className={classes.info}>
            Для доступа к сайту авторизуйтесь в <a href="http://my.bsu.ru/pg.php">личном кабинете</a>.
        </div>
      </Layout>
  );
};

Login.propTypes = {
  classes: PropTypes.object,
  isAuth: PropTypes.bool,
  location: PropTypes.object,
};

export default withStyles(() => ({
  info: {
    margin: '30px auto',
    textAlign: 'center'
  }
}))(Login);
