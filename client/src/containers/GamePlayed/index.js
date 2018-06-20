import React, { Component } from 'react';
import { connect } from 'react-redux';
import { duckRequest } from 'ducks';
import GamePlayed from 'components/GamePlayed';

class GamePlayedContainer extends Component {
  componentDidMount() {
    // this.props.fetch({ID: 0});
  }

  render() {
    return (
      <GamePlayed {...this} />
    )
  }
}

const mapStateToProps = state => ({
  matchList: state.schedule.get('matchList'),
  isCreating: state.schedule.get('isCreating'),
});

const mapDispatchToProps = dispatch => ({
  fetch: params => dispatch(duckRequest('GET_MATCH_SCHED_REQUEST', params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePlayedContainer);