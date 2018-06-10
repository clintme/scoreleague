import React from 'react';
import { connect } from 'react-redux';
import { List, Tabs, Avatar, Form, Icon, Input, Button, Checkbox } from 'antd';
import RegisterButton from 'containers/Schedules/register';
import './index.css';

const { TabPane } = Tabs;
const FormItem = Form.Item;

const ScheduleList = (params) => {
  const { form: { getFieldDecorator }, submitHandler, props: { playersList, isCreating, teamInfo } } = params;

  if (!teamInfo) {
    return <div></div>;
  }

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
              <List.Item actions={[<a href={`/players/${item.id}`}>edit</a>]}>
                <List.Item.Meta
                  title={item.name}
                  description={`Registered: ${item.created_at}`}
                />
              </List.Item>
            )
          }
        />
      </TabPane>
    </Tabs>
  </div>
)};

export default Form.create()(ScheduleList);
