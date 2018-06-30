import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button } from 'antd';

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

    const { props: { teamInfo } } = this;
    form.validateFields((err, params) => {
      if (!err) {
        const fields = {
          Name: params.Name,
          TeamID: teamInfo.get('id'),
        };

        this.props.dispatch(duckRequest('PREG_REQUEST', fields))
      }
    });
  }

  render() {
    const { playersList } = this.props;
    return (
      <div>
        <Button onClick={this.showModal}>Start Game</Button>
      </div>
    )
  }
}

export default connect()(PlayersRegisterContainer);

// <RegisterPlayersModal {...this} />
