import * as apiUtil from 'helpers/util';

/**
 * Create
 * @param {string} email - username of user
 * @param {string} password - password of user
 */
export function registration({ Name, Description, Captain, Payment }) {
  return apiUtil.postToAPI({
    endpoint: 'teams/registration',
    body: { Name, Description, Captain, Payment },
  });
}

/**
 * Update
 * @param {string} email - username of user
 * @param {string} password - password of user
 */
export function update({ Id, Name, Description, Captain, Payment }) {
  return apiUtil.postToAPI({
    endpoint: `teams/edit/${Id}`,
    body: { Name, Description, Captain, Payment },
  });
}

/**
 * List of Registered Team
 * @param {string} email - username of user
 * @param {string} password - password of user
 */
export function registeredTeam({ ID }) {
  return apiUtil.postToAPI({
    endpoint: 'teams',
    body: { ID: parseInt(ID, 10) },
  });
}
