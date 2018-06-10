import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import SideMenu from 'components/App/side_menu';
import 'components/App/index.css';

const { Header, Sider, Content, Footer } = Layout;

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
    console.log(this.props.path)
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <SideMenu />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ScoreLeague.com ©2018 Created by XanderDwyl
          </Footer>
        </Layout>
      </Layout>
    );
  }
};

export default AppLayout;
