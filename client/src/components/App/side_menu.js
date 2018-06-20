import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const pathKeys = {
  '/': '1',
  '/team': '2',
  '/players': '3',
  '/schedules': '4'
}

const AppLayout = ({ location: { pathname } }) => (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathKeys[pathname]]}>
    <Menu.Item key="1">
      <Link to="/">
        <Icon type="home" />
        <span>Home</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/team">
        <Icon type="team" />
        <span>Team</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/players">
        <Icon type="user" />
        <span>Players</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="4">
      <Link to="/schedules">
        <Icon type="calendar" />
        <span>Schedules</span>
      </Link>
    </Menu.Item>
  </Menu>
);

export default AppLayout;
