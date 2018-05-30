import jwtDecode from 'jwt-decode';
// import defaultImage from '../../assets/img/default-image.png';
// import { setJWTToken } from '../helpers/auth';

// sanitize payload
const loggedInPayload = payload => ({
  email: payload.email,
  profile_img: payload.profile_img,
  email_verified: payload.email_verified,
  redirect_url: payload.redirect_url,
  locale: payload.locale,
  isLogin: payload.isLogin,
  isSignUp: payload.isSignUp,
  send_email: payload.send_email,
});

/**
 * Common duck function that will handle all dashboard request.
 *
 * @param { actionType } `String` an Action type of reducer.
 * @param { params } `Object` it is optional.
 * return { ...req } will take action for request.
 */
export function duckRequest(actionType, params) {
  const req = { type: actionType };

  if (params) { req.payload = params; }

  return { ...req };
}

/**
 * Common duck function that will handle all dashboard success.
 *
 * @param { actionType } `String` an Action type of reducer.
 * @param { params } `Object` it is optional.
 * return { ...req } will take action for success.
 */
export function duckSuccess(actionType, response) {
  let res = response;
  const req = { type: actionType };

  if (actionType === 'LOGIN_SUCCESS' || actionType === 'CREATE_USER_SUCCESS') {
    // setJWTToken(response.token);
    console.log('set JWT Token!')
  }

  if (actionType === 'LOGIN_SUCCESS') {
    const { email, profile_img, email_verified, send_email } = jwtDecode(response.token);

    const params = {
      ...response,
      email,
      profile_img: profile_img, // || defaultImage, // eslint-disable-line camelcase
      email_verified: email_verified || false,  // eslint-disable-line camelcase
      send_email: send_email || false,  // eslint-disable-line camelcase
    };

    res = loggedInPayload(params);
  }

  req.payload = res;

  return { ...req };
}

/**
 * Common duck function that will handle all dashboard error.
 *
 * @param { actionType } `String` an Action type of reducer.
 * @param { params } `Object` it is optional.
 * return { ...req } will take action for error.
 */
export function duckFailed(actionType, error) {
  const req = { type: actionType };

  if (error) { req.payload = { error }; }

  return { ...req };
}
