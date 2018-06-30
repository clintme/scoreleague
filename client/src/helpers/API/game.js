import * as apiUtil from 'helpers/util';

/**
 * GetMatchSchedules
 * @param {string} Name - player name
 * @param {string} TeamID - registered Team ID
 */
export function getMatchGames({ ID }) {
  console.log(ID)
  return apiUtil.postToAPI({
    endpoint: 'games',
    body: { ID },
  });
}

// /**
//  * List of Registered Team
//  * @param {string} email - username of user
//  * @param {string} password - password of user
//  */
// export function registeredPlayers( TeamID ) {
//   return apiUtil.postToAPI({
//     endpoint: 'players',
//     body: { team_id: parseInt(TeamID, 10) },
//   });
// }
