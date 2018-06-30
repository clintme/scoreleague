import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import logo from './logo.svg';
// import RequiredAuth from '../containers/Auth';
import Home from 'components/Home';
import Teams from 'containers/Teams';
import PlayerLists from 'containers/Players/list';
import Schedules from 'containers/Schedules';
import SetGameModal from 'components/Schedules/setGameModal';
import GamePlayed from 'containers/GamePlayed';
import Login from 'containers/Login';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/login' component={Login} />
    <Route path='/team' component={Teams} />
    
    <Route exact path='/players' component={PlayerLists} />
    <Route path='/schedules' component={Schedules} />
    <Route exact path='/game_played' component={GamePlayed} />
  </Switch>
);
    
export default Routes;

// <Route path='/dashboard' component={RequiredAuth(Dashboard)} />
