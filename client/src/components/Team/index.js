import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Tabs, Avatar, Form, Icon, Input, Button, Checkbox } from 'antd';
import RegisterButton from 'containers/Team/register';
import './index.css';

const { TabPane } = Tabs;
const FormItem = Form.Item;

const TeamList = (props) => {
  const { form: { getFieldDecorator }, submitHandler, props: { teamList, isCreating } } = props;
  return (
  <div className="team-list">
      <Tabs tabBarExtraContent={<RegisterButton isCreating={isCreating} />}>
        <TabPane tab={'Registered Teams'} key="1">
          <List
            className="demo-loadmore-list"
            loading={false}
            itemLayout="horizontal"
            loadMore={false}
            dataSource={teamList.size && teamList.sort((a, b) => a.get('id') < b.get('id')).toJSON()}
            renderItem={
              item => (
                <List.Item actions={[<Link to={`/team/${item.id}/players`}>Details</Link>, <Link to={`/team/${item.id}`}>Edit</Link>]}>
                  <List.Item.Meta
                    title={item.name}
                    description={item.payment}
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
