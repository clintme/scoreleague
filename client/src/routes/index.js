import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import logo from './logo.svg';
import Home from '../components/Home';
// import Dashboard from '../components/Dashboard';
import Team from '../containers/Team';
import Players from '../containers/Players';
import Login from '../containers/Login';
// import RequiredAuth from '../containers/Auth';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/team' component={Team} />
    <Route exact path='/team/:teamID/players' component={Players} />
  </Switch>
);
    
export default Routes;

// <Route path='/dashboard' component={RequiredAuth(Dashboard)} />
