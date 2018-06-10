import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button } from 'antd';


import Team from 'components/Teams';
import RegisterTeamModal from 'components/Teams/registerModal';
import { duckRequest } from 'ducks';

class TeamRegisterContainer extends Component {
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

    form.validateFields((err, params) => {
      if (!err) {
        const fields = {
          Name: params.Name,
          Description: params.Description,
          Captain: params.Captain,
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
    const { teamList } = this.props;

    return (
      <div>
        <Badge count={teamList.size} style={{ backgroundColor: '#52c41a' }} />
        <Button onClick={this.showModal}>Register</Button>
        <RegisterTeamModal {...this} />
      </div>
    )
  }
}

export default connect()(TeamRegisterContainer);