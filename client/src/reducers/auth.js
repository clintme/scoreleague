import { fromJS } from 'immutable';
// import { delJWTToken } from '../helpers/auth';

const initialState = fromJS({
  isLoggingIn: false,
  isLoggingOut: false,
  isAuthenticated: false,
});

/* eslint-disable no-param-reassign */
const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      state = state.merge({ isLoggingIn: true });
      return state;
    case 'LOGIN_SUCCESS':
      state = state.merge({
        isLoggingIn: false,
        isLoggingOut: false,
        isAuthenticated: true,
      });
      return state;
    case 'LOGIN_FAILED':
      state = state.merge({
        isLoggingIn: false,
        isAuthenticated: false,
      });
      return state;
    case 'LOGOUT_REQUEST':
      state = state.merge({ isLoggingOut: true });
      return state;
    case 'LOGOUT_SUCCESS':
      state = state.merge({
        ...action.payload,
        token: null,
        user: null,
        email: null,
        profile_img: null,
        isLoggingIn: false,
        isLoggingOut: false,
        isAuthenticated: false,
      });
      // delJWTToken();
      return state;
    default:
      return state;
  }
};

export default auth;
