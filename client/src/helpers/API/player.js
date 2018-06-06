import * as apiUtil from 'helpers/util';

/**
 * AddPlayer
 * @param {string} Name - player name
 * @param {string} TeamID - registered Team ID
 */
export function addPlayer({ Name, TeamID }) {
  return apiUtil.postToAPI({
    endpoint: 'players/registration',
    body: { Name, team_id: TeamID },
  });
}

/**
 * List of Registered Team
 * @param {string} email - username of user
 * @param {string} password - password of user
 */
export function registeredPlayers( TeamID ) {
  return apiUtil.postToAPI({
    endpoint: 'players',
    body: { team_id: parseInt(TeamID, 10) },
  });
}
