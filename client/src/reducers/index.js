import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
// import { reducer as form } from 'redux-form';

import auth from 'reducers/auth';
import team from 'reducers/team';
import player from 'reducers/player';
import schedule from 'reducers/schedule';

const rootReducer = combineReducers({
  auth,
  team,
  player,
  routing,
  schedule,
});

export default rootReducer;
