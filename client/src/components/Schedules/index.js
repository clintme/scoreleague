import React from 'react';
import Moment from 'react-moment';
import { Card, Col, Row, Tabs, Form, Icon } from 'antd';
import './index.css';
import profile from 'media/id.png';

const { TabPane } = Tabs;
const { Meta } = Card;
const MatchTeam = ({ match }) => (
  match.map(item => <span key={item}>{item}</span>)
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
                    actions={item.get('status') === 0 ?
                      [<Icon type="setting" />, <Icon type="caret-right" />] :
                      [<Icon type="setting" />, <span>Done</span>]
                    }
                >
                  <Meta
                      title={<Moment format="LLL">{item.get('schedule')}</Moment>}                  
                    description={<MatchTeam match={item.get('match')} />}
                  />
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
