import React, { Component } from 'react'
import { Icon, Avatar } from 'dru'
import screenfull from 'screenfull'

export interface HeaderProps {
  onCollapsedClick: (collapsed: boolean) => void
}

class Header extends Component<HeaderProps> {
  state = {
    collapsed: false,
    icon: 'indentleft',
    shrinkIcon: 'arrowsalt'
  }

  componentDidMount () {
    screenfull.onchange(() => {
      this.setState({
        shrinkIcon: screenfull.isFullscreen ? 'shrink' : 'arrowsalt'
      })
    })
  }

  componentWillUnmount () {
    screenfull.off('change')
  }

  screenfullToggle() {
    if (screenfull.isEnabled) {
      screenfull.toggle()
    }
  }

  handleCollapsedClick() {
    const { onCollapsedClick } = this.props
    this.setState({
      collapsed: !this.state.collapsed,
      icon: this.state.collapsed ? 'indentleft' : 'indentright'
    }, () => {
      onCollapsedClick && onCollapsedClick(this.state.collapsed)
    })
  }

  render() {
    return (
      <div className="admin-header-block">
        <Icon className='admin-collapsed' type={this.state.icon} onClick={this.handleCollapsedClick.bind(this)} />
        <div className='admin-nav'>
          <Icon className='admin-shrink' type={this.state.shrinkIcon} onClick={this.screenfullToggle.bind(this)} />
          <Avatar className='admin-avatar' />
        </div>
      </div>
    )
  }
}

export default Header
