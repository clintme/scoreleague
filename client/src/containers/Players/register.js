import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import { Form, List, Tabs, Avatar, Icon, Input, Checkbox, Button } from 'antd';


import Players from 'components/Players';
import RegisterPlayersModal from 'components/Players/registerModal';
import { duckRequest } from 'ducks';

class PlayersRegisterContainer extends Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
      loading: false,
    });
  }
  
  handleCancel = (e) => {
    e.preventDefault();    
    this.setState({
      visible: false,
    });
  }
  submitHandler = (e, form) => {
    e.preventDefault();

    const { props: { isCreating, teamInfo } } = this;
    form.validateFields((err, params) => {
      if (!err) {
        const fields = {
          Name: params.Name,
          TeamID: teamInfo.get('id'),
        };

        console.log(fields)
        this.props.dispatch(duckRequest('PREG_REQUEST', fields))
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.isCreating,
    });
  }

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Button onClick={this.showModal}>Add Players</Button>
        <RegisterPlayersModal {...this} />
      </div>
    )
  }
}

export default connect()(PlayersRegisterContainer);