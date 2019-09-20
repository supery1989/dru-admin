import React, { Component } from 'react'
import { Breadcrumb, Divider, Field, Button, Form, Popup, Loading } from 'dru'
import PrimaryClassificationOptions from '../dict/PrimaryClassificationOptions'
import SecondaryClassificationOptions from '../dict/SecondaryClassificationOptions'
import ThirdClassificationOptions from '../dict/ThirdClassificationOptions'
import TypeOptions from '../dict/TypeOptions'
import TagOptions from '../dict/TagOptions'
import request from '../libs/request'
import '../style/Add.scss'

export interface  AddProps {
  location?: any
}

class Add extends Component<AddProps> {
  submitParmas: any = {}
  _id: string = ''
  state = {
    loading: false,
    submitParmas: {
      primaryClassification: '',
      secondaryClassification: '',
      thirdClassification: '',
      question: '',
      answer: '',
      tag: [],
      disabled: false,
      type: ''
    }
  }

  componentDidMount() {
    const query = this.props.location.search
    if (query) {
      const _id = query.split('=')[1]
      this._id = _id
      const self = this
      this.setState({
        loading: true
      })
      request({ url: `/api/questions/detail?_id=${_id}` })
        .then(function(res) {
          if (res.success) {
            const {
              primaryClassification,
              secondaryClassification,
              thirdClassification,
              question,
              answer,
              tag,
              disabled,
              type,
            } = res.data[0]
            self.submitParmas = {
              primaryClassification,
              secondaryClassification,
              thirdClassification,
              question,
              answer,
              tag,
              disabled,
              type,
            }
            self.setState({
              submitParmas: self.submitParmas,
              loading: false
            })
          }
        });
    }
  }

  reset() {
    (this.refs.form as any).reset()
  }

  submit() {
    const self = this;
    if (this._id) {
      this.submitParmas._id = this._id
      request({ url: '/api/questions/edit', method: 'post', data: this.submitParmas })
      .then(function(res) {
        if (res.success) {
          Popup.success({
            title: '恭喜您',
            message: '题目修改成功',
            onOk: function() {
              location.reload()
            }
          })
        } else {
          Popup.error({
            title: '修改失败',
            message: '请重新操作',
            onOk: function() {
              self.submit()
            }
          })
        }
      });
    } else {
      request({ url: '/api/questions/add', method: 'post', data: this.submitParmas })
      .then(function(res) {
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
  }

  handleValue(param: string, value: any) {
    this.submitParmas[param] = value
  }

  render() {
    const { submitParmas, loading } = this.state
    return (
      <Loading loading={loading}>
        <div className='cms-table-title'>
          <Breadcrumb isRr className='cms-table-title-bread'>
            <Breadcrumb.Item href='/'>首页</Breadcrumb.Item>
            <Breadcrumb.Item>添加试题</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider />
        <div className='cms-add'>
          <Form ref='form' labelWidth={100}>
            <Field type='select' options={PrimaryClassificationOptions} value={submitParmas['primaryClassification']} label='一级栏目' getValue={this.handleValue.bind(this, 'primaryClassification')} />
            <Field type='select' value={submitParmas['secondaryClassification']} options={SecondaryClassificationOptions} label='二级栏目' getValue={this.handleValue.bind(this, 'secondaryClassification')} />
            <Field type='select' value={submitParmas['thirdClassification']} options={ThirdClassificationOptions} label='三级栏目' getValue={this.handleValue.bind(this, 'thirdClassification')} />
            <Field type='select' options={TypeOptions} value={submitParmas['type']} label='题目类型' getValue={this.handleValue.bind(this, 'type')} />
            <Field type='switch' value={submitParmas['disabled']} label='是否禁用' getValue={this.handleValue.bind(this, 'disabled')} />
            <Field type='checkbox' value={submitParmas['tag']} options={TagOptions} label='标签' getValue={this.handleValue.bind(this, 'tag')} />
            <Field label='题目' value={submitParmas['question']} getValue={this.handleValue.bind(this, 'question')} />
            <Field type='textarea' value={submitParmas['answer']} label='答案' getValue={this.handleValue.bind(this, 'answer')} />
            <div className='cms-add-btn'>
              <Button type='primary' onClick={this.submit.bind(this)}>提 交</Button>
              <Button onClick={this.reset.bind(this)} className='cms-add-btn-reset'>重 置</Button>
            </div>
          </Form>
        </div>
      </Loading>
    )
  }
}

export default Add
