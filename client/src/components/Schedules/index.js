import React from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Tabs, Avatar, Form, Icon, Badge } from 'antd';
import './index.css';
import profile from 'media/id.png';

const { TabPane } = Tabs;
const { Meta } = Card;
const MatchTeam = ({ match }) => (
  match.map(item => <div key={item}>{item}</div>)
)
const ScheduleList = (params) => {
  const { props: { matchList, isCreating } } = params;

  if (isCreating) {
    return <div></div>;
  }

  return (
  <div id="schedule-list">
    <Tabs>
      <TabPane tab={`Game Schedule`} key="1">
        <Row gutter={24}>
          {
            matchList.map(item => (
              <Col key={item.get('id')} span={6} style={{marginBottom: '20px'}}>
                <Card
                  style={{ width: 300 }}
                    actions={[<Icon type="setting" />, <Icon type="caret-right" />]}
                >
                  <Meta
                    title={item.get('schedule')}
                    description={item.get('schedule')}
                  />
                  <MatchTeam match={item.get('match')} />
                </Card>
              </Col>
            ))
          }
        </Row>
      </TabPane>
    </Tabs>
  </div>
)};

export default Form.create()(ScheduleList);
