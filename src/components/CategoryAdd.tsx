import * as React from 'react'
import { Field, Popup } from 'dru'
import { observer } from 'mobx-react'
import classOptionsStore from '../store/classOptionsStore'
import request from '../libs/request'
import TableAdd from '../common/TableAdd'
import '../style/Add.scss'

export interface CategoryAddProps {
  location?: any
}
@observer
class CategoryAdd extends React.Component<CategoryAddProps> {
  submitParmas: any = {}
  _id: string = ''
  secondNode: any
  init: boolean = true
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
    const query = this.props.location.search
    if (query) {
      const _id = query.split('=')[1]
      this._id = _id
      const self = this
      this.setState({
        loading: true
      })
      request({ url: `/category/detail?_id=${_id}` })
        .then(function(res) {
          if (res[0]) {
            const {
              class: classificatonName,
            } = res[0]
            let primaryClassification = ''
            let secondaryClassification = ''
            if (res[0].type === 'first') {
              self.submitParmas = {
                classificatonName,
                primaryClassification,
                secondaryClassification
              }
              self.setState({
                submitParmas: self.submitParmas,
                loading: false
              })
            } else if (res[0].type === 'second') {
              primaryClassification = res[0].pid
              self.submitParmas = {
                classificatonName,
                primaryClassification,
                secondaryClassification
              }
              self.setState({
                submitParmas: self.submitParmas,
                loading: false
              })
            } else if (res[0].type === 'third') {
              secondaryClassification = res[0].pid
              request({ url: `/category/detail?_id=${res[0].pid}` })
                .then(parent => {
                  primaryClassification = parent[0].pid
                  self.submitParmas = {
                    classificatonName,
                    primaryClassification,
                    secondaryClassification
                  }
                  // self.setSecondClass(secondaryClassification)
                  self.setState({
                    submitParmas: self.submitParmas,
                    loading: false
                  }, () => {
                    setTimeout(() => {
                      self.init = false;
                    }, 0)
                  })
                })
            }
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
  }

  queryClass() {
    classOptionsStore.getClassOptions('root')
  }

  reset() {
    (this.refs.form as any).reset()
  }

  beforeSubmit() {
    const { classificatonName, primaryClassification, secondaryClassification } = this.submitParmas
    let params: any = {}
    if (!primaryClassification && !secondaryClassification) {
      if (!classificatonName) {
        return { check: false, error: '提交内容不能为空！' }
      } else {
        params = {
          pid: 'root',
          class: classificatonName,
          type: 'first'
        }
      }
    } else {
      if (!classificatonName) {
        return { check: false, error: '栏目名称不能为空！' }
      } else {
        params = {
          pid: secondaryClassification || primaryClassification,
          class: classificatonName,
          type: secondaryClassification ? 'third' : 'second'
        }
      }
    }
    return { check: true, params }
  }

  setSecondClass(value: string) {
    if (value) {
      classOptionsStore.getClassOptions(value)
    }
  }

  handleValue(param: string, value: any) {
    if (param === 'primaryClassification') {
      if (!this.init) {
        this.secondNode && this.secondNode.reset()
        this.submitParmas.secondaryClassification = ''
      }
      
      this.setSecondClass(value)
    }
    this.submitParmas[param] = value
  }

  render() {
    const { submitParmas, loading } = this.state
    const { PrimaryClassificationOptions, SecondaryClassificationOptions } = classOptionsStore
    return (
      <TableAdd
        loading={loading}
        submitParmas={submitParmas}
        _id={this._id}
        dict='category'
        beforeSubmit={this.beforeSubmit.bind(this)}
      >
        <div>当前类别</div>
        <Field type='select' options={PrimaryClassificationOptions} value={submitParmas['primaryClassification']} label='一级栏目' getValue={this.handleValue.bind(this, 'primaryClassification')} />
        <Field ref={(node: any) => this.secondNode = node} type='select' options={SecondaryClassificationOptions} value={submitParmas['secondaryClassification']} label='二级栏目' getValue={this.handleValue.bind(this, 'secondaryClassification')} />
        <Field value={submitParmas['classificatonName']} label='栏目名称' placeholder='请输入栏目名称' getValue={this.handleValue.bind(this, 'classificatonName')} />
      </TableAdd>
    )
  }
}

export default CategoryAdd
