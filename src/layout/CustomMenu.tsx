import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'dru'

export interface CustomMenuProps {
  menus: any,
  collapsed: boolean,
}

class CustomMenu extends Component<CustomMenuProps> {
  state: any

  constructor(props: CustomMenuProps) {
    super(props)

    this.state = {
      selectedKey: '',
      collapsed: props.collapsed
    }
  }

  componentDidMount() {
    const pathname = location.hash.split('#')[1].split('?')[0]
    this.setState({
      selectedKey: pathname
    })
  }

  componentWillReceiveProps(nextProps: CustomMenuProps) {
    if (this.props.collapsed !== nextProps.collapsed) {
      this.setState({ collapsed: nextProps.collapsed })
    }
  }

  renderItem() {
    const { menus} = this.props
    if (menus.length) {
      return menus.map((menu: any) => {
        return (
          <Menu.Item key={menu.key} index={menu.key}>
            <Link className='admin-menu-link' to={menu.key}><Icon type={menu.icon} />{menu.title}</Link>
          </Menu.Item>
        )
      })
    }
    return null
  }

  render() {
    return (
      <Menu collapsed={this.state.collapsed} theme='dark' selectedKey={this.state.selectedKey}>
        {this.renderItem()}
      </Menu>
    )
  }
}

export default CustomMenu
