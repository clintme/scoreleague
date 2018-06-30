import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeamEdit from 'components/Teams/edit';
import { duckRequest } from 'ducks';

class TeamUpdateContainer extends Component {

  componentDidMount() {
    const {
      match: {
        params: { teamID }
      }
    } = this.props;

    console.log(teamID)
    this.props.fetch(teamID);
    this.props.fetchTeamInfo(teamID || 0);
  }

  render() {
    console.log(this)
    return (
      <TeamEdit {...this} />
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
  submitHandler: (e, form, id, historyPush) => {
    e.preventDefault();

    form.validateFields((err, params) => {
      if (!err) {
        const fields = {
          Name: params.Name,
          Description: params.Description,
          Captain: params.Captain,
          Payment: parseInt(params.Payment, 10) || 0,
          Id: parseInt(id, 10),
        };

        dispatch(duckRequest('TEAM_UPDATE_REQUEST', fields, historyPush))
      }
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamUpdateContainer);