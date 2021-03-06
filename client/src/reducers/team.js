import { List, fromJS } from 'immutable';
import { addItemSelector } from 'selectors';

const initialState = fromJS({
  isFetching: false,
  isCreating: false,
  teamList: new List(),
  teamInfo: new List()
});

/* eslint-disable no-param-reassign */
const team = (state = initialState, action) => {
  switch (action.type) {
    case 'TEAM_INFO_REQUEST':
      state = state.merge({ 
        isFetching: true,
        teamInfo: new List(),
      });
      return state;
    case 'TEAM_INFO_SUCCESS':
      state = state.merge({
        isFetching: false,
        teamInfo: action.payload,
      });
      return state;
    case 'TEAM_INFO_FAILED':
      state = state.merge({
        isFetching: false,
      });
      return state;
    case 'GET_TEAM_REQUEST':
      state = state.merge({
        isFetching: true,
        teamList: new List(),
      });
      return state;
    case 'GET_TEAM_SUCCESS':
      state = state.merge({
        isFetching: false,
        teamList: action.payload.data.teams,
      });
      return state;
    case 'GET_TEAM_FAILED':
      state = state.merge({
        isFetching: false,
      });
      return state;
    case 'TREG_REQUEST':
      state = state.merge({
        isCreating: true,
      });
      return state;
    case 'TREG_SUCCESS':
      state = state.merge({
        isCreating: false,
      });

      state = addItemSelector(state, ['teamList'], action.payload.data);

      return state;
    case 'TREG_FAILED':
      state = state.merge({
        isCreating: false,
      });
      return state;
    case 'TEAM_UPDATE_REQUEST':
      state = state.merge({
        isCreating: true,
      });
      return state;
    case 'TEAM_UPDATE_SUCCESS':
      state = state.merge({
        isCreating: false,
      });

      state = addItemSelector(state, ['teamList'], action.payload.data);

      return state;
    case 'TEAM_UPDATE_FAILED':
      state = state.merge({
        isCreating: false,
      });
      return state;
    default:
      return state;
  }
};

export default team;
