import React from 'react';
import { Card, Form, Input, Icon, Button } from 'antd';
import './index.scss';

const { Item } = Form;

const TeamUpdateForm = (params) => {
  const { form: { getFieldDecorator }, props: { teamInfo, submitHandler } } = params

  return (
    <Card className="team-list" title="Edit Teams" bordered={false} style={{ width: '100%' }}>    
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

      <Button key="submit" htmlType="submit" type="primary" onClick={(e) => submitHandler(e, params.form, teamInfo.get('id'))}>
        Update
      </Button>
    </Card>
)};

export default Form.create()(TeamUpdateForm);
