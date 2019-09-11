import * as React from 'react'
import { Layout, BackTop, Icon, Copyright } from 'dru'
import './layout/layout.scss'
import ComponentsRouter from './router'
import CustomMenu from './layout/CustomMenu'

const menus = [
  {
    title: '题目管理',
    icon: 'table',
    key: '/components/list'
  },
  {
    title: '添加试题',
    icon: 'plussquare-o',
    key: '/components/add'
  }
]

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
            <CustomMenu menus={menus} collapsed={this.state.collapsed} />
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