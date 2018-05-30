import * as apiUtil from 'helpers/util';

/**
 * Login
 * @param {string} email - username of user
 * @param {string} password - password of user
 */
export function login({ email, password }) {
  return apiUtil.postToAPI({
    endpoint: 'login',
    body: {
      email,
      password,
    },
  });
}

/**
 * Registration
 * @param {string} email - username of user
 * @param {string} password - password of user
 */
export function registration({ email, password }) {
  return apiUtil.postToAPI({
    endpoint: 'login',
    body: {
      email,
      password,
    },
  });
}
