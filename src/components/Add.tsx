import React, { Component } from 'react'
import { Breadcrumb, Divider, Field, Button, Form } from 'dru'
import '../style/Add.scss'

class Add extends Component {
  reset() {
    (this.refs.form as any).reset()
  }

  render() {
    const options1 = [
      { label: '西瓜', value: 1 },
      {label: '土豆', value: 2 }
    ]
    return (
      <div>
        <div className='cms-table-title'>
          <Breadcrumb isRr className='cms-table-title-bread'>
            <Breadcrumb.Item href='/'>首页</Breadcrumb.Item>
            <Breadcrumb.Item>添加试题</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider />
        <div className='cms-add'>
          <Form ref='form' labelWidth={100}>
            <Field type='select' options={options1} label='一级栏目' />
            <Field type='select' options={options1} label='二级栏目' />
            <Field label='题目' />
            <Field type='textarea' label='答案' />
            <div className='cms-add-btn'>
              <Button type='primary'>提 交</Button>
              <Button onClick={this.reset.bind(this)} className='cms-add-btn-reset'>重 置</Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default Add
