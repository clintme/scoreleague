import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
// import { reducer as toastr } from 'react-redux-toastr';
// import { reducer as form } from 'redux-form';

import auth from './auth';

const rootReducer = combineReducers({
  auth,
  routing,
  // toastr,
  // form,
});

export default rootReducer;
