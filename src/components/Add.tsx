import React, { Component } from 'react'
import { Breadcrumb, Divider } from 'dru'

class Add extends Component {
  render() {
    return (
      <div>
        <div className='cms-table-title'>
          <Breadcrumb isRr className='cms-table-title-bread'>
            <Breadcrumb.Item href='/'>首页</Breadcrumb.Item>
            <Breadcrumb.Item>添加试题</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider />
      </div>
    )
  }
}

export default Add
