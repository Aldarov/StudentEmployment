import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { Login } from '../auth';
import { NotFound } from '../sysPages';

import { OrganizationList } from '../../../modules/organizationList';

class Navigation extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <PrivateRoute exact path='/' component={OrganizationList}/>
          <PrivateRoute path='/organization' component={OrganizationList}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Navigation;
