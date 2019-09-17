import React, { Component } from 'react'
import { Breadcrumb, Divider, Field, Button, Form, Popup } from 'dru'
import request from '../libs/request'
import '../style/Add.scss'

class Add extends Component {
  submitParmas: any = {}

  reset() {
    (this.refs.form as any).reset()
  }

  submit() {
    const self = this;
    request({ url: '/api/questions/add', method: 'post', data: this.submitParmas })
      .then(function(res) {
        console.dir(res)
        if (res.success) {
          Popup.success({
            title: '恭喜您',
            message: '题目添加成功',
            onOk: function() {
              location.reload()
            }
          })
        } else {
          Popup.error({
            title: '添加失败',
            message: '请重新操作',
            onOk: function() {
              self.submit()
            }
          })
        }
      });
  }

  handleValue(param: string, value: any) {
    this.submitParmas[param] = value
  }

  render() {
    const primaryClassificationOptions = [
      { label: 'js', value: 'js' },
      {label: 'nginx', value: 'nginx' }
    ]
    const secondaryClassificationOptions = [
      { label: 'es5', value: 'es5' },
      { label: 'es6', value: 'es6' },
    ]
    const tagOptions = [
      { label: 'promise', value: 'promise' },
      { label: 'this', value: 'this' }
    ]
    const typeOptions = [
      { label: 'input', value: 'input' }
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
            <Field type='select' options={primaryClassificationOptions} label='一级栏目' getValue={this.handleValue.bind(this, 'primaryClassification')} />
            <Field type='select' options={secondaryClassificationOptions} label='二级栏目' getValue={this.handleValue.bind(this, 'secondaryClassification')} />
            <Field type='select' options={typeOptions} value='input' label='题目类型' getValue={this.handleValue.bind(this, 'type')} />
            <Field type='switch' value={false} label='是否禁用' getValue={this.handleValue.bind(this, 'disabled')} />
            <Field type='checkbox' options={tagOptions} label='标签' getValue={this.handleValue.bind(this, 'tag')} />
            <Field label='题目' getValue={this.handleValue.bind(this, 'question')} />
            <Field type='textarea' label='答案' getValue={this.handleValue.bind(this, 'answer')} />
            <div className='cms-add-btn'>
              <Button type='primary' onClick={this.submit.bind(this)}>提 交</Button>
              <Button onClick={this.reset.bind(this)} className='cms-add-btn-reset'>重 置</Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default Add
