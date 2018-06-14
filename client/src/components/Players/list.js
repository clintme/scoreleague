import React from 'react';
import { Card, Col, Row, Tabs, Form, Badge, Icon, Avatar } from 'antd';
import './index.css';
import profile from 'media/id.png';

const { TabPane } = Tabs;
const { Meta } = Card;

const PlayerList = (params) => {
  const { props: { playersList } } = params;
  return (
    <div className="players-list">
      <Tabs tabBarExtraContent={<Badge count={playersList.size} />}>
        <TabPane tab='Registered Players' key="1">
          <Row gutter={24}>
          {
            playersList.map(item => (
              <Col key={item.get('id')} span={6} style={{marginBottom: '20px'}}>
                <Card
                  style={{ width: 300 }}
                  actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                  <Badge count={item.get('id')} className={`badge-${item.get('team_name').toLowerCase()}`}></Badge>
                  <Meta
                    avatar={<Avatar src={profile} />}
                    title={item.get('name')}
                    description={item.get('team_name')}
                  />
                </Card>
              </Col>
            ))
          }
          </Row>
        </TabPane>
      </Tabs>
    </div>
  )
};

export default Form.create()(PlayerList);
