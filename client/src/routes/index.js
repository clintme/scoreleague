import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import logo from './logo.svg';
import Home from '../components/Home';
// import Dashboard from '../components/Dashboard';
import Team from '../containers/Team';
import Login from '../containers/Login';
// import RequiredAuth from '../containers/Auth';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/team' component={Team} />
    </Switch>
  </BrowserRouter>
);
    
export default Routes;

// <Route path='/dashboard' component={RequiredAuth(Dashboard)} />
