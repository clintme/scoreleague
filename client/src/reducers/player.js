import { List, fromJS } from 'immutable';
import { addItemSelector } from 'selectors/app';

const initialState = fromJS({
  isFetching: false,
  isCreating: false,
  playersList: new List()
});

/* eslint-disable no-param-reassign */
const player = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLAYERS_REQUEST':
      state = state.merge({
        isFetching: true,
        playersList: new List(),
      });
      return state;
    case 'GET_PLAYERS_SUCCESS':
      state = state.merge({
        isFetching: false,
        playersList: action.payload.data.players,
      });
      return state;
    case 'GET_PLAYERS_FAILED':
      state = state.merge({
        isFetching: false,
      });
      return state;
    default:
      return state;
  }
};

export default player;
