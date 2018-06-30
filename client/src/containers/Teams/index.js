import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { duckRequest } from 'ducks';

import Teams from 'components/Teams';
import TeamEdit from 'containers/Teams/edit';
import Players from 'containers/Players';

class TeamContainer extends Component {

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    return (
      <div>
        <Teams {...this} />
        <Switch>
          <Route path='/team/:teamID/edit' component={TeamEdit} />
          <Route path='/team/:teamID/players' component={Players} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  teamList: state.team.get('teamList'),
  isCreating: state.team.get('isCreating'),
});

const mapDispatchToProps = dispatch => ({
  fetch: params => dispatch(duckRequest('GET_TEAM_REQUEST', params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamContainer);