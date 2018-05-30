import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.css';

const FormItem = Form.Item;

const Login = (props) => {

  const { form: { getFieldDecorator }, submitHandler } = props

  return (
  <div className="login">
    <header className="App-header">
      <h1 className="App-title">Login</h1>
    </header>
      <Form onSubmit={(e) => submitHandler(e, props.form)} className="login-form">
      <FormItem>
        {getFieldDecorator('userName', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>Remember me</Checkbox>
        )}
        <a className="login-form-forgot" href="">Forgot password</a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
          </Button>
        Or <a href="">register now!</a>
      </FormItem>
    </Form>
  </div>
)};

export default Form.create()(Login);
