import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Tabs, Form, Icon } from 'antd';
import './index.css';
// import RegisterButton from 'containers/Schedules/game_start';
import { getGameMatchSets } from 'helpers/util';

const { TabPane } = Tabs;
const { Meta } = Card;

const MatchTeam = ({ item }) => (
  <div className='match-team'>
    <span>{item.get('host')}</span>
    <span>{item.get('guest')}</span>
  </div>
)
const ScheduleList = (params) => {
  const { state: { selectedTab }, props: { matchList, gameList, isCreating },  onSets } = params;

  console.log(params)
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
                      [<Icon type="edit" />, <Link to={`/schedules/${item.get('id')}/${selectedTab}`}><Icon type="caret-right" /></Link>] :
                      [<Icon type="edit" />, <span>Done</span>]
                    }
                >
                    {
                      getGameMatchSets(gameList, item.get('id')).length ?
                        <Tabs type="card" onChange={onSets}>
                          {getGameMatchSets(gameList, item.get('id')).map(gameItem => (
                            <TabPane tab={`Set ${gameItem.get('set_no')}`} key={gameItem.get('set_no')}>
                              <Meta
                                title={<Moment format="LLL">{gameItem.get('created_at')}</Moment>}
                                description={<MatchTeam item={item} />}
                              />
                          
                            </TabPane>
                          ))}
                        </Tabs> :
                        <Meta
                          title={<Moment format="LLL">{item.get('scheduled_date')}</Moment>}
                          description={<MatchTeam item={item} />}
                        />
                    }
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
