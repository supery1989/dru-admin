import * as React from 'react'
import { Field, Button, Form, Error, Popup } from 'dru'
import { observer } from 'mobx-react'
import classOptionsStore from '../store/classOptionsStore'
import TopBreadcrumb from '../common/Breadcrumb'
import request from '../libs/request'
import '../style/Add.scss'

@observer
class CategoryAdd extends React.Component {
  submitParmas: any = {}
  state = {
    error: '',
    loading: false,
    submitParmas: {
      primaryClassification: '',
      secondaryClassification: '',
      classificatonName: ''
    },
  }

  componentDidMount() {
    this.queryClass()
  }

  queryClass() {
    classOptionsStore.getClassOptions('root')
  }

  reset() {
    (this.refs.form as any).reset()
  }

  submit() {
    this.setState({ error: '' })
    const { classificatonName, primaryClassification, secondaryClassification } = this.submitParmas
    let params: any = {}
    const self = this
    if (!primaryClassification && !secondaryClassification) {
      if (!classificatonName) {
        this.setState({ error: '提交内容不能为空！ '})
        return
      } else {
        params = {
          pid: 'root',
          class: classificatonName
        }
      }
    } else {
      if (!classificatonName) {
        this.setState({ error: '栏目名称不能为空！ '})
        return
      } else {
        params = {
          pid: secondaryClassification || primaryClassification,
          class: classificatonName
        }
      }
    }
    request({ url: '/api/category/add', method: 'post', data: params })
      .then(res => {
        if (res.success) {
          Popup.success({
            title: '恭喜您',
            message: '栏目添加成功',
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
      })
  }

  setSecondClass(value: string) {
    if (value) {
      classOptionsStore.getClassOptions(value)
    }
  }

  handleValue(param: string, value: any) {
    if (param === 'primaryClassification') {
      this.submitParmas.secondaryClassification = ''
      this.setSecondClass(value)
    }
    this.submitParmas[param] = value
  }

  render() {
    const { submitParmas } = this.state
    const { PrimaryClassificationOptions, SecondaryClassificationOptions } = classOptionsStore
    return (
      <div className='cms-category-add'>
        <TopBreadcrumb lastName='添加栏目' />
        <div className='cms-add'>
          <Form ref='form' labelWidth={100}>
            <Field type='select' options={PrimaryClassificationOptions} value={submitParmas['primaryClassification']} label='一级栏目' getValue={this.handleValue.bind(this, 'primaryClassification')} />
            <Field type='select' options={SecondaryClassificationOptions} value={submitParmas['secondaryClassification']} label='二级栏目' getValue={this.handleValue.bind(this, 'secondaryClassification')} />
            <Field value={submitParmas['classificatonName']} label='栏目名称' placeholder='请输入栏目名称' getValue={this.handleValue.bind(this, 'classificatonName')} />
            <div className='cms-add-btn'>
              <Error tip={this.state.error} />
              <Button type='primary' onClick={this.submit.bind(this)}>提 交</Button>
              <Button onClick={this.reset.bind(this)} className='cms-add-btn-reset'>重 置</Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

export default CategoryAdd
