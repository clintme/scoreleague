import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Tabs, Avatar, Form, Icon, Input, Button, Checkbox } from 'antd';
import RegisterButton from 'containers/Teams/register';
import './index.scss';

const { TabPane } = Tabs;
const FormItem = Form.Item;

const TeamList = (params) => {
  const { form: { getFieldDecorator }, submitHandler, props: { playersList, isCreating, teamInfo } } = params;
  console.log(teamInfo)  
  return (
  <div className="team-list">
    Edit
  </div>
)};

export default Form.create()(TeamList);
