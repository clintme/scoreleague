import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import SideMenu from 'components/App/side_menu';
import 'components/App/index.css';

const { Header, Sider, Content, Footer } = Layout;

const MainLayout = ({ state, props, toggle }) => (
  <Layout style={{ height: "100vh" }}>
    <Sider
      trigger={null}
      collapsible
      collapsed={state.collapsed}
    >
      <div className="logo" />
      <SideMenu location={props.history.location} />
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={state.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />
      </Header>
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
        {props.children}
      </Content>
    </Layout>
  </Layout>
);

const GamePlayedLayout = ({ state, props, toggle }) => (
  <Layout style={{ height: "100vh" }}>
    <Content style={{ margin: '5px', padding: 24, background: '#fff', minHeight: 280 }}>
      {props.children}
    </Content>
  </Layout>
);

class AppLayout extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const { pathname } = this.props.history.location;
    if (pathname === '/game_played') {
      return <GamePlayedLayout {...this} />;
    }

    return <MainLayout {...this} />;
  }
};

export default AppLayout;
