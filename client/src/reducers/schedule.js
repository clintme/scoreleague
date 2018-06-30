import { List, fromJS } from 'immutable';
import { matchScheduleDataSelector } from 'selectors';

const initialState = fromJS({
  isFetching: false,
  isCreating: false,
  matchList: new List()
});

/* eslint-disable no-param-reassign */
const schedule = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MATCH_SCHED_REQUEST':
      state = state.merge({
        isFetching: true,
        matchList: new List(),
      });
      return state;
    case 'GET_MATCH_SCHED_SUCCESS':
      state = state.merge({
        isFetching: false,
        matchList: action.payload.data
      });
      return state;
    case 'GET_MATCH_SCHED_FAILED':
      state = state.merge({
        isFetching: false,
      });
      return state;
    default:
      return state;
  }
};

export default schedule;
