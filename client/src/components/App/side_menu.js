import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';


import Home from 'components/Home';
// import Dashboard from 'components/Dashboard';
import Team from 'containers/Team';
import Login from 'containers/Login';

const { Header, Sider, Content, Footer } = Layout;

const redirectPath = (p) => {
  const path = {
    1: '/login',
    2: '/team',
    3: '/players'
  }

  console.log(this)
  console.log(p)
}

const AppLayout = () => (
  <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={redirectPath}>
    <Menu.Item key="1">
      <Link to="/">
        <Icon type="user" />
        <span>Login</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/team">
        <Icon type="video-camera" />
        <span>Team</span>
      </Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/players">
        <Icon type="upload" />
        <span>Players</span>
      </Link>
    </Menu.Item>
  </Menu>
);

export default AppLayout;
