import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from '../../components/PrivateRoute';
import { Login } from '../auth';
import { NotFound } from '../sysPages';

import { Main } from '../../../modules/main';

class Navigation extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <PrivateRoute exact path='/' component={Main}/>
          <PrivateRoute path='/main' component={Main}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Navigation;
