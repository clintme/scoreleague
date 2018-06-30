import { List, fromJS } from 'immutable';
import { matchScheduleDataSelector } from 'selectors';

const initialState = fromJS({
  isFetching: false,
  isCreating: false,
  gameList: new List()
});

/* eslint-disable no-param-reassign */
const schedule = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_GAME_REQUEST':
      state = state.merge({
        isFetching: true,
      });
      return state;
    case 'CREATE_GAME_SUCCESS':
      state = state.merge({
        isFetching: false,
      });
      return state;
    case 'CREATE_GAME_FAILED':
      state = state.merge({
        isFetching: false,
      });
      return state;
    case 'GET_GAME_REQUEST':
      state = state.merge({
        isFetching: true,
        gameList: new List(),
      });
      return state;
    case 'GET_GAME_SUCCESS':
      state = state.merge({
        isFetching: false,
        gameList: action.payload.data
      });
      return state;
    case 'GET_GAME_FAILED':
      state = state.merge({
        isFetching: false,
      });
      return state;
    default:
      return state;
  }
};

export default schedule;
