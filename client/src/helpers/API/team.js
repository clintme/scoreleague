import * as apiUtil from 'helpers/util';

/**
 * Registration
 * @param {string} email - username of user
 * @param {string} password - password of user
 */
export function registration({ email }) {
  return apiUtil.postToAPI({
    endpoint: 'teams/registration',
    body: { name: 'Alexjander Bacalso' },
  });
}
