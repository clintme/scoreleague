import React from 'react';
import { connect } from 'react-redux';
import { List, Tabs, Avatar, Form, Icon, Input, Button, Checkbox } from 'antd';
import RegisterButton from 'containers/Players/register';
import './index.css';

const { TabPane } = Tabs;
const FormItem = Form.Item;

const PlayerList = (params) => {
  const { form: { getFieldDecorator }, submitHandler, props: { playersList, isCreating, teamInfo } } = params;
  return (
  <div className="players-list">
      <Tabs tabBarExtraContent={<RegisterButton {...params.props} />}>
        <TabPane tab={`Team ${teamInfo.get('name')} Players`} key="1">
          <List
            loading={false}
            itemLayout="horizontal"
            loadMore={false}
            dataSource={playersList.size && playersList.sort((a, b) => a.get('id') < b.get('id')).toJSON()}
            renderItem={
              item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.name}
                    description='Position'
                  />
                </List.Item>
              )
            }
          />
        </TabPane>
    </Tabs>
  </div>
)};

export default Form.create()(PlayerList);
