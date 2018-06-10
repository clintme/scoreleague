import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import logo from './logo.svg';
// import RequiredAuth from '../containers/Auth';
import Home from '../components/Home';
import Teams from '../containers/Teams';
import TeamEdit from '../containers/Teams/edit';
import Players from '../containers/Players';
import PlayerLists from '../containers/Players/list';
import Schedules from '../containers/Schedules';
import Login from '../containers/Login';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/team' component={Teams} />
    <Route exact path='/team/:teamID/edit' component={TeamEdit} />
    <Route exact path='/team/:teamID/players' component={Players} />
    <Route exact path='/players' component={PlayerLists} />
    <Route exact path='/schedules' component={Schedules} />
  </Switch>
);
    
export default Routes;

// <Route path='/dashboard' component={RequiredAuth(Dashboard)} />
