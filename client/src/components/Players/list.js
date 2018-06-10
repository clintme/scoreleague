import React from 'react';
import { List, Tabs, Form, Badge} from 'antd';
import './index.css';

const { TabPane } = Tabs;

const PlayerList = (params) => {
  const { props: { playersList } } = params;
  return (
    <div className="players-list">
      <Tabs tabBarExtraContent={<Badge count={playersList.size} />}>
        <TabPane tab='Registered Players' key="1">
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
  )
};

export default Form.create()(PlayerList);
