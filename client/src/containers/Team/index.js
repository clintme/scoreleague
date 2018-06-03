import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import { Form, List, Tabs, Avatar, Icon, Input, Checkbox, Modal, Button } from 'antd';

import Team from 'components/Team';
import { duckRequest } from 'ducks';

class TeamContainer extends Component {

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    return (
      <Team {...this} />
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