import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import { Form, List, Tabs, Avatar, Icon, Input, Checkbox, Button } from 'antd';

import SetGameModal from 'components/Schedules/setGameModal';
import { duckRequest } from 'ducks';

class ScheduleRegisterContainer extends Component {
  state = { visible: true }

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

    this.props.dispatch(push('/schedules'));
  }
  submitHandler = (e, form) => {
    e.preventDefault();

    form.validateFields((err, params) => {
      if (!err) {
        const fields = {
          Name: params.Name,
          Payment: parseInt(params.Payment, 10),
        };

        this.props.dispatch(duckRequest('TREG_REQUEST', fields))
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.isCreating,
    });
  }

  render() {
    return (
      <SetGameModal {...this} />
    )
  }
}

export default connect()(ScheduleRegisterContainer);