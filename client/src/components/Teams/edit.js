import React from 'react';
import { Card, Form, Input, Icon, Button, Modal } from 'antd';
import './index.css';

const { Item } = Form;

const TeamUpdateForm = (params) => {
  const { form: { getFieldDecorator }, props: { teamInfo, submitHandler, history: { push } } } = params
  
  return (
    <Modal
      // width="100%"
      className="edit-team-modal"
      title="Edit Team Info"
      visible={true}
      // onOk={props.handleOk}
      // onCancel={props.handleCancel}
      footer={[
        // <Button key="back" onClick={props.handleCancel}>Close</Button>,
        <Button key="submit" htmlType="submit" type="primary" onClick={(e) => submitHandler(e, params.form, teamInfo.get('id'), push)}>
          Update
        </Button>,
      ]}
    >
      <Item>
        {getFieldDecorator('Name', { initialValue: teamInfo.get('name') }, {
          rules: [{ required: true, message: 'Team name is required!' }],
        })(
          <Input prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Team Name" />
        )}
      </Item>
      <Item>
        {getFieldDecorator('Description', { initialValue: teamInfo.get('description') })(
          <Input prefix={<Icon type="fork" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Description" />
        )}
      </Item>
      <Item>
        {getFieldDecorator('Captain', { initialValue: teamInfo.get('captain') })(
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Captain" />
        )}
      </Item>
      <Item>
        {getFieldDecorator('Payment', { initialValue: teamInfo.get('payment') }, {
          rules: [{ required: true, message: 'Payment is required!' }],
        })(
          <Input prefix={<Icon type="pay-circle-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Payment" />
        )}
      </Item>
    </Modal>
)};

export default Form.create()(TeamUpdateForm);
