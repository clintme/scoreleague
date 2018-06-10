import React, { Component } from 'react';
import { connect } from 'react-redux';

import Players from 'components/Players';
import { duckRequest } from 'ducks';

class PlayersContainer extends Component {

  componentDidMount() {
    const {
      match: {
        params: { teamID } 
      }
    } = this.props;

    this.props.fetch(teamID);
    this.props.fetchTeamInfo(teamID || 0);
  }

  render() {
    return (
      <Players {...this} />
    )
  }
}

const mapStateToProps = state => ({
  playersList: state.player.get('playersList'),
  teamInfo: state.team.get('teamInfo'),
  isCreating: state.player.get('isCreating'),
});

const mapDispatchToProps = dispatch => ({
  fetch: teamID => dispatch(duckRequest('GET_PLAYERS_REQUEST', teamID)),
  fetchTeamInfo: ID => dispatch(duckRequest('TEAM_INFO_REQUEST', { ID })),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayersContainer);