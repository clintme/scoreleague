import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, Button } from 'antd';


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

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   visible: nextProps.isCreating,
    // });
  }

  render() {
    const { playersList } = this.props;
    return (
      <div>
        <Badge count={playersList.size} style={{ backgroundColor: '#52c41a' }} />
        {
          playersList.size < 10 ?
          <Button onClick={this.showModal}>Add Players</Button> :
          <Button onClick={this.showModal} disabled>Add Players</Button>}
        <RegisterPlayersModal {...this} />
      </div>
    )
  }
}

export default connect()(PlayersRegisterContainer);