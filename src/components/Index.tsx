import * as React from 'react'
import { Layout, BackTop, Copyright } from 'dru'
import '../layout/layout.scss'
import ComponentsRouter from '../router'
import CustomMenu from '../layout/CustomMenu'
import Header from '../layout/Header'

const menus = [
  {
    title: '题目管理',
    icon: 'table',
    key: '/components/list'
  },
  {
    title: '栏目管理',
    icon: 'bars',
    key: '/components/category-list'
  }
]

export interface IndexProps {
  location?: any
}

class Index extends React.Component<IndexProps> {
  state = {
    collapsed: false,
    current: ''
  }

  componentDidMount() {
    this.setState({
      current: this.transferPathname(this.props.location.pathname)
    })
  }

  componentWillReceiveProps(nextProps: IndexProps) {
    const pathname = nextProps.location.pathname
    if (this.props.location.pathname !== pathname) {
      this.setState({ current: this.transferPathname(pathname) })
    }
  }

  transferPathname(pathname: string) {
    return pathname.replace('-add', '-list')
  }

  handleCollapsedClick(collapsed: boolean) {
    this.setState({ collapsed })
  }

  public render() {
    return (
      <Layout className="admin">
        <Layout.Silder collapsed={this.state.collapsed} className='admin-slider'>
          <div className='admin-slider-block'>
            <div className='admin-logo'>管理系统</div>
            <CustomMenu selected={this.state.current} menus={menus} collapsed={this.state.collapsed} />
          </div>
        </Layout.Silder>
        <Layout.Content auto style={{display: 'flex', flexDirection: 'column'}}>
          <Layout.Header style={{lineHeight: '64px'}} className='admin-header'>
            <Header onCollapsedClick={this.handleCollapsedClick.bind(this)} />
          </Layout.Header>
          <Layout.Content className='admin-content' id="admin-content">
            <div className='admin-content-block'>
              <ComponentsRouter />
            </div>
          </Layout.Content>
          <Layout.Footer style={{textAlign: 'center'}} className='admin-footer'>
            <Copyright author='dru' />
          </Layout.Footer>
        </Layout.Content>
        <BackTop />
      </Layout>
    )
  }
}
export default Index