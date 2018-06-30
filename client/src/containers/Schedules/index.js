import React, { Component } from 'react';
import { connect } from 'react-redux';
import { duckRequest } from 'ducks';
import Schedules from 'components/Schedules';
import GamePlayed from 'containers/Schedules/game_played';
import { Switch, Route } from 'react-router-dom';

import { _bind } from 'helpers/util';

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);

    _bind(['fetchMatch', 'addSet', 'onSets'], this);
  }

  state = { 
    visible: false,
    selectedTab: 1,
    matchID: '',
  }

  componentDidMount() {
    this.fetchMatch({ID: 0});
    this.fetchGame({ID: 0});
  }

  fetchMatch( params ) {
    const { props: { dispatch } } = this;
    
    dispatch(duckRequest('GET_MATCH_SCHED_REQUEST', params));
  }
  fetchGame( params ) {
    const { props: { dispatch } } = this;
    
    dispatch(duckRequest('GET_GAME_REQUEST', params));
  }

  addSet( e, params ) {
    e.preventDefault();

    this.setState({
      visible: true,
      matchID: params.get('id')
    });
  }

  onSets(activeKey) {
    this.setState({ selectedTab: activeKey })
  }

  handleCancel = (e) => {
    e.preventDefault();

    this.setState({
      visible: false,
    });
  }
  submitHandler = (e, form) => {
    e.preventDefault();

    const { state: { matchID } } = this;
    form.validateFields((err, params) => {
      if (!err) {
        const fields = {
          MatchID: matchID,
          SetID: parseInt(params.SetID, 10)
        };

        this.props.dispatch(duckRequest('CREATE_GAME_REQUEST', fields))
      }
    });
  }

  render() {
    return (
      <div>
        <Schedules {...this} />
        <Switch>
          <Route path='/schedules/:id/:setNo' component={GamePlayed} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  matchList: state.schedule.get('matchList'),
  gameList: state.game.get('gameList'),
  isCreating: state.schedule.get('isCreating'),
});

export default connect(mapStateToProps)(ScheduleContainer);