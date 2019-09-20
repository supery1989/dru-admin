import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'dru'

export interface CustomMenuProps {
  menus: any,
  collapsed: boolean,
  selected?: any
}

class CustomMenu extends Component<CustomMenuProps> {
  state: any

  constructor(props: CustomMenuProps) {
    super(props)

    this.state = {
      selectedKey: props.selected,
      collapsed: props.collapsed
    }
  }

  componentWillReceiveProps(nextProps: CustomMenuProps) {
    if (this.props.collapsed !== nextProps.collapsed) {
      this.setState({ collapsed: nextProps.collapsed })
    }
    if (this.props.selected !== nextProps.selected) {
      this.setState({ selectedKey: nextProps.selected })
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
