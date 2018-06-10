import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, List, Tabs, Avatar, Form, Icon, Input, Button, Checkbox } from 'antd';
import RegisterButton from 'containers/Teams/register';
import './index.scss';

const { Header, Sider, Content, Footer } = Layout;
const { TabPane } = Tabs;
const { SubMenu } = Menu;
const FormItem = Form.Item;

const TeamList = (params) => {
  const { form: { getFieldDecorator }, submitHandler, props: { teamList, isCreating } } = params;
  return (
  <div className="team-list">
    <Tabs tabBarExtraContent={<RegisterButton isCreating={isCreating} {...params.props} />}>
      <TabPane tab={'Registered Teams'} key="1">
        <List
          className="demoloadmorelist"
          loading={false}
          itemLayout="horizontal"
          loadMore={false}
          dataSource={teamList.size && teamList.sort((a, b) => a.get('id') < b.get('id')).toJSON()}
          renderItem={
            item => (
              <List.Item actions={[<Link to={`/team/${item.id}/players`}>Details</Link>, <Link to={`/team/${item.id}/edit`}>Edit</Link>]}>
                <List.Item.Meta
                  title={item.name}
                  description={item.description}
                />
              </List.Item>
            )
          }
        />
      </TabPane>
    </Tabs>
  </div>
)};

export default Form.create()(TeamList);
