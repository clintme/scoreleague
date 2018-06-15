import React, { Component } from 'react';
import { connect } from 'react-redux';
import { duckRequest } from 'ducks';
import Schedules from 'components/Schedules';

class ScheduleContainer extends Component {
  componentDidMount() {
    this.props.fetch({ID: 0});
  }

  render() {
    return (
      <Schedules {...this} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);