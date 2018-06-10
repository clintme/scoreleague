import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlayerLists from 'components/Players/list';
import { duckRequest } from 'ducks';

class PlayersContainer extends Component {

  componentDidMount() {
    const {
      match: {
        params: { teamID } 
      }
    } = this.props;

    this.props.fetch();
    this.props.fetchTeamInfo(teamID || 0);
  }

  render() {
    return (
      <PlayerLists {...this} />
    )
  }
}

const mapStateToProps = state => ({
  playersList: state.player.get('playersList'),
  teamInfo: state.team.get('teamInfo'),
  isCreating: state.player.get('isCreating'),
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(duckRequest('GET_PLAYERS_REQUEST')),
  fetchTeamInfo: ID => dispatch(duckRequest('TEAM_INFO_REQUEST', { ID })),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayersContainer);