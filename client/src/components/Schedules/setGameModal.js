import React from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Input, Icon, Button } from 'antd';

import './index.css';

const { Item } = Form;

const TeamRegistration = (props) => {

  const { form: { getFieldDecorator }, submitHandler} = props;
  console.log(props.state)
  console.log(props.state.visible)
  return (
    <Modal
      // width="100%"
      className="registration-modal"
      title="Enter Set NO. to start the game"
      visible={props.state.visible}
      // onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={[
        <Button key="back" onClick={props.handleCancel}>Close</Button>,
        <Button key="submit" htmlType="submit" type="primary" onClick={(e) => submitHandler(e, props.form)}>
          Register
        </Button>,
      ]}
    >
      <Item>
        {getFieldDecorator('SetID', {
          rules: [{ required: true, message: 'Team name is required!' }],
        })(
          <Input prefix={<Icon type="dribbble" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Set ID" />
        )}
      </Item>
    </Modal>
)};

export default Form.create()(TeamRegistration);
