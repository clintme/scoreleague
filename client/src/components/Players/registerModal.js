import React from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Input, Icon, Button } from 'antd';

import './index.css';
const { Item } = Form;

const AddPlayers = (params) => {

  const {
    form: { getFieldDecorator },
    props: { isCreating, form, teamInfo },
    state: { visible },
    handleOk,
    handleCancel,
    submitHandler,
  } = params;

  return (
    <div className="player-registration">
      <Modal
        // width="100%"
        className="registration-modal"
        title={`${teamInfo.get('name')} Team Players Registration`}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>Close</Button>,
          <Button key="submit" htmlType="submit" type="primary" onClick={(e) => submitHandler(e, params.form)}>
            Register
          </Button>,
        ]}
      >
        <Item>
          {getFieldDecorator('Name', {
            rules: [{ required: true, message: 'Player name is required!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Player Name" />
          )}
        </Item>
      </Modal>
    </div>
  );
};

export default Form.create()(AddPlayers);
