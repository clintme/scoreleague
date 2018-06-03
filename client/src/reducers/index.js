import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
// import { reducer as form } from 'redux-form';

import auth from 'reducers/auth';
import team from 'reducers/team';

const rootReducer = combineReducers({
  auth,
  team,
  routing,
  // form,
});

export default rootReducer;
