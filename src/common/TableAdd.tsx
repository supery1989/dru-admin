import * as React from 'react'
import { Loading, Form, Button, Popup } from 'dru'
import TopBreadcrumb from './Breadcrumb'
import request from '../libs/request'
import '../style/Add.scss'

export interface TableAddProps {
  loading?: boolean
  submitParmas?: any
  _id?: string
  dict: string
  beforeSubmit?: () => any
}
class TableAdd extends React.Component<TableAddProps> {
  reset() {
    (this.refs.form as any).reset()
  }

  submit() {
    const { beforeSubmit, submitParmas, _id } = this.props
    let result: any = { check: true }
    let postParams = submitParmas
    if (beforeSubmit) {
      result = beforeSubmit()
    }
    if (result.check) {
      postParams = result.params
      const self = this;
      const params = Object.assign({}, postParams, {
        user: 'admin',
        source: 'admin'
      })
      if (_id) {
        params._id = _id
        request({ url: `/${self.props.dict}/edit`, method: 'post', data: params })
        .then(function(res) {
          console.dir(res)
          Popup.success({
            title: '恭喜您',
            message: '修改成功',
            onOk: function() {
              location.reload()
            }
          })
        })
        .catch(err => {
          Popup.error({
            title: '修改失败',
            message: `请重新操作，失败原因${err}`,
            onOk: function() {
              self.submit()
            }
          })
        });
      } else {
        request({ url: `/${self.props.dict}/add`, method: 'post', data: params })
        .then(function(res) {
          Popup.success({
            title: '恭喜您',
            message: '添加成功',
            onOk: function() {
              location.reload()
            }
          })
        })
        .catch(err => {
          Popup.error({
            title: '修改失败',
            message: `请重新操作，失败原因${err}`,
            onOk: function() {
              self.submit()
            }
          })
        });
      }
    } else {
      console.dir(result)
    }
  }
  
  render() {
    return (
      <Loading loading={this.props.loading}>
        <TopBreadcrumb lastName='添加试题' />
        <div className='cms-add'>
          <Form ref='form' labelWidth={100}>
            {this.props.children}
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

export default TableAdd