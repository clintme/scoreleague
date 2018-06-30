import React from 'react';
import { List, Tabs, Form, Modal, Button } from 'antd';
import RegisterButton from 'containers/Players/register';
import './index.css';

const { TabPane } = Tabs;

const PlayerList = (params) => {
  const { props: { playersList, teamInfo } } = params;
  return (
    <Modal
      width="80%"
      className="edit-team-modal"
      title="Edit Team Info"
      visible={true}
      style={{ top: 10, height: "100vh" }}
      maskClosable={false}
      // onOk={props.handleOk}
      // onCancel={props.handleCancel}
      footer={[
        // <Button key="back" onClick={props.handleCancel}>Close</Button>,
        // onClick = {(e) => submitHandler(e, params.form, teamInfo.get('id'))}
        <Button key="submit" htmlType="submit" type="primary">
          Update
        </Button>,
      ]}
    >
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
    </Modal>
)};

export default Form.create()(PlayerList);
