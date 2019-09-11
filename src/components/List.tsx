import React, { Component } from 'react'
import { Table, Page, Breadcrumb, Popup, Input, Button, Divider, Notification } from 'dru'
import request from '../libs/request'
import '../style/List.scss'

export interface ListProps {
  history?: any
}
class List extends Component<ListProps> {
  state = {
    data: [],
    loading: true,
    total: 0,
  }
  filterObj: any = {}

  componentDidMount() {
    const self = this;
    self.setState({ loading: true })
    request({ url: '/rest/ad/list/all?sort=updated_at&dir=desc&page=1&limit=20' })
      .then(function(response) {
        self.setState({
          data: response.data,
          total: response.count,
          loading: false
        })
      });
  }

  delete(row: any) {
    Popup.confirm({
      title: '警告',
      message: (<div>确定要删除吗？</div>),
      icon: 'warningcircle',
      onOk: () => {
        console.dir(row)
        Notification({
          title: '恭喜您',
          message: '记录删除成功',
          type: 'success'
        });
      }
    })
  }

  filter() {
    const self = this
    request({ url: `/rest/ad/list/all?sort=updated_at&dir=desc&page=1&limit=20&name=${this.filterObj.name}` })
      .then(function(response) {
        self.setState({
          data: response.data,
          total: response.count,
          loading: false
        })
      });
  }

  handleInputChange(value: any) {
    this.filterObj.name = value
  }

  toPlus() {
    this.props.history.push('/components/add')
  }

  render() {
    const columns = [
      {
        type: 'index',
      },
      {
        label: '广告名称',
        prop: 'name',
        width: 250,
      },
      {
        label: '开始日期',
        prop: 'begin_date',
        width: 160
      },
      {
        label: '结束日期',
        prop: 'end_date',
      },
      {
        type: 'button',
        btnConfig: {
          text: '编辑',
          onClick: (row: any) => {
            console.dir(row)
          }
        },
      },
      {
        type: 'button',
        btnConfig: {
          text: '删除',
          type: 'danger',
          onClick: (row: any) => {
            this.delete(row)
          }
        },
      },
    ];
    
    return (
      <div>
        <div className='cms-table-title'>
          <Breadcrumb isRr className='cms-table-title-bread'>
            <Breadcrumb.Item href='/'>首页</Breadcrumb.Item>
            <Breadcrumb.Item>题目管理</Breadcrumb.Item>
          </Breadcrumb>
          <Button onClick={this.toPlus.bind(this)} className='cms-table-title-plus' size='large' type='primary' icon='plus' />
        </div>
        <Divider />
        <div className='cms-table-filter'>
          <label>广告名称:</label>
          <Input className='cms-table-filter-input' placeholder='请输入内容' onChange={this.handleInputChange.bind(this)} />
          <Button type='primary' onClick={this.filter.bind(this)}>确定</Button>
        </div>
        <Table columns={columns} data={this.state.data} height={500} loading={this.state.loading} />
        <Page className='cms-table-page' total={this.state.total} pageSizes showJumper showTotal hideOnSinglePage />
      </div>
    )
  }
}

export default List