import React from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Input, Icon, Button } from 'antd';

import './index.scss';

const { Item } = Form;

const TeamRegistration = (props) => {

  const { form: { getFieldDecorator }, submitHandler } = props

  return (
  <div className="team-registration">
    <Modal
      // width="100%"
      className="registration-modal"
      title="Team Registration"
      visible={props.state.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={[
        <Button key="back" onClick={props.handleCancel}>Close</Button>,
        <Button key="submit" htmlType="submit" type="primary" onClick={(e) => submitHandler(e, props.form)}>
          Register
        </Button>,
      ]}
    >
      <Item>
        {getFieldDecorator('Name', {
          rules: [{ required: true, message: 'Team name is required!' }],
        })(
          <Input prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Team Name" />
        )}
      </Item>
      <Item>
        {getFieldDecorator('Description')(
          <Input prefix={<Icon type="fork" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Description" />
        )}
      </Item>
      <Item>
        {getFieldDecorator('Captain')(
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Captain" />
        )}
      </Item>
      <Item>
        {getFieldDecorator('Payment', {
          rules: [{ required: true, message: 'Payment is required!' }],
        })(
          <Input prefix={<Icon type="pay-circle-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Payment" />
        )}
      </Item>
    </Modal>
  </div>
)};

export default Form.create()(TeamRegistration);
