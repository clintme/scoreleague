import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

const AppLayout = () => (
  <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
    <Menu.Item key="1">
      <Icon type="user" />
      <span>Login</span>
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="video-camera" />
      <span>Team</span>
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="upload" />
      <span>Players</span>
    </Menu.Item>
  </Menu>
);

export default AppLayout;
