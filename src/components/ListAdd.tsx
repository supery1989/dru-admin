import React, { Component } from 'react'
import { Field, Popup } from 'dru'
import { observer } from 'mobx-react'
import classOptionsStore from '../store/classOptionsStore'
import TypeOptions from '../dict/TypeOptions'
import TagOptions from '../dict/TagOptions'
import request from '../libs/request'
import TableAdd from '../common/TableAdd'

export interface  ListAddProps {
  location?: any
}

@observer
class ListAdd extends Component<ListAddProps> {
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
      type: '',
      judge: false
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
      request({ url: `/questions/detail?_id=${_id}` })
        .then(function(res) {
          if (res[0]) {
            const {
              primaryClassification,
              secondaryClassification,
              thirdClassification,
              question,
              answer,
              tag,
              disabled,
              type,
              judge,
            } = res[0]
            self.submitParmas = {
              primaryClassification,
              secondaryClassification,
              thirdClassification,
              question,
              answer,
              tag,
              disabled,
              type,
              judge,
            }
            self.setState({
              submitParmas: self.submitParmas,
              loading: false
            })
          } else {
            self.setState({
              loading: false
            })
            Popup.info({
              title: '修改失败',
              message: '请检查id',
            })
          }
        });
    }
    this.setSecondClass('root')
  }

  setSecondClass(value: string, type?: string) {
    if (value) {
      classOptionsStore.getClassOptions(value, type)
    }
  }

  handleValue(param: string, value: any) {
    if (param === 'primaryClassification') {
      this.setSecondClass(value)
    } else if (param === 'secondaryClassification') {
      this.setSecondClass(value, 'third')
    }
    this.submitParmas[param] = value
  }

  render() {
    const { submitParmas, loading } = this.state
    const { PrimaryClassificationOptions, SecondaryClassificationOptions, ThirdClassificationOptions } = classOptionsStore
    return (
      <TableAdd
        loading={loading}
        submitParmas={this.submitParmas}
        _id={this._id}
        dict='questions'
      >
        <Field className='field-inline' type='select' options={PrimaryClassificationOptions} value={submitParmas['primaryClassification']} label='一级栏目' getValue={this.handleValue.bind(this, 'primaryClassification')} />
        <Field className='field-inline' type='select' value={submitParmas['secondaryClassification']} options={SecondaryClassificationOptions} label='二级栏目' getValue={this.handleValue.bind(this, 'secondaryClassification')} />
        <Field className='field-inline' type='select' value={submitParmas['thirdClassification']} options={ThirdClassificationOptions} label='三级栏目' getValue={this.handleValue.bind(this, 'thirdClassification')} />
        <Field className='field-inline' type='select' options={TypeOptions} value={submitParmas['type']} label='题目类型' getValue={this.handleValue.bind(this, 'type')} />
        <Field className='field-inline' type='switch' value={submitParmas['disabled']} label='是否禁用' getValue={this.handleValue.bind(this, 'disabled')} />
        <Field className='field-inline' type='switch' value={submitParmas['judge']} label='系统判卷' getValue={this.handleValue.bind(this, 'judge')} />
        <Field type='checkbox' value={submitParmas['tag']} options={TagOptions} label='标签' getValue={this.handleValue.bind(this, 'tag')} />
        <Field label='题目' value={submitParmas['question']} getValue={this.handleValue.bind(this, 'question')} />
        <Field type='textarea' value={submitParmas['answer']} label='答案' getValue={this.handleValue.bind(this, 'answer')} />
      </TableAdd>
    )
  }
}

export default ListAdd
