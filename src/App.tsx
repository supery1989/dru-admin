import * as React from 'react'
import { Link } from 'react-router-dom'
import { Layout, BackTop, Icon, Copyright, Menu } from 'dru'
import './layout/layout.scss'
import ComponentsRouter from './router'

class App extends React.Component {
  state = {
    collapsed: false,
    icon: 'indentleft'
  }

  handleClick() {
    this.setState({
      collapsed: !this.state.collapsed,
      icon: this.state.collapsed ? 'indentleft' : 'indentright'
    })
  }

  public render() {
    return (
      <Layout className="admin">
        <Layout.Silder collapsed={this.state.collapsed} className='admin-slider'>
          <div className='admin-slider-block'>
            <div className='admin-logo'>管理系统</div>
            <Menu collapsed={this.state.collapsed} theme='dark'>
              <Menu.Item index='1'><Icon type='table' />
                <Link className='admin-menu-link' to={`/components/list`}>查看</Link>
              </Menu.Item>
              <Menu.Item index='2'><Icon type='shop' /><span>菜单2</span></Menu.Item>
            </Menu>
          </div>
        </Layout.Silder>
        <Layout.Content auto style={{display: 'flex', flexDirection: 'column'}}>
          <Layout.Header style={{lineHeight: '64px'}} className='admin-header'>
            <div className="admin-header-block">
              <Icon className='admin-collapsed' type={this.state.icon} onClick={this.handleClick.bind(this)} />
            </div>
          </Layout.Header>
          <Layout.Content className='admin-content' id="admin-content">
            <div className='admin-content-block'>
              <ComponentsRouter />
            </div>
          </Layout.Content>
          <Layout.Footer style={{textAlign: 'center'}} className='admin-footer'>
            <Copyright author='supery-y' />
          </Layout.Footer>
        </Layout.Content>
        <BackTop />
      </Layout>
    )
  }
}
export default App