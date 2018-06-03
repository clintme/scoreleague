import React from 'react';
import { connect } from 'react-redux';
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
      <TabPane tab="Registered Teams" key="1">
        <List
          className="demo-loadmore-list"
          loading={false}
          itemLayout="horizontal"
          loadMore={false}
          dataSource={teamList.size && teamList.toJSON()}
          renderItem={
            item => (
              <List.Item actions={[<a href={`/team/${item.id}`}>edit</a>]}>
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
