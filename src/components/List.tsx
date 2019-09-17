import React, { Component } from 'react'
import { Table, Page, Breadcrumb, Popup, Input, Button, Divider, Notification, Moment } from 'dru'
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
  columns = [
    {
      type: 'index',
    },
    {
      label: '题目',
      prop: 'question',
      width: 250,
    },
    {
      label: '一级分类',
      prop: 'primaryClassification',
      width: 160
    },
    {
      label: '二级分类',
      prop: 'secondaryClassification',
      width: 150,
    },
    {
      label: '是否禁用',
      prop: 'disabled',
      width: 150,
      render: function(data: any) {
        if (data.disabled === true) {
          return '是'
        }
        return '否'
      }
    },
    {
      label: '更新时间',
      prop: 'updateTime',
      render: function(data: any) {
        if (data.updateTime !== undefined) {
          return Moment(new Date(data.updateTime), 'YYYY-MM-DD HH:mm:ss')
        }
        return '--'
      }
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

  componentDidMount() {
    const self = this;
    self.setState({ loading: true })
    request({ url: '/api/questions/query' })
      .then(function(response) {
        self.setState({
          data: response.data,
          total: response.count,
          loading: false
        })
      });
  }

  delete(row: any) {
    const self = this;
    Popup.confirm({
      title: '警告',
      message: (<div>确定要删除吗？</div>),
      icon: 'warningcircle',
      onOk: () => {
        request({ url: '/api/questions/delete', method: 'post', data: { _id: row._id } })
          .then(function(res) {
            if (res.success) {
              const { data } = self.state
              const temp = data.filter((item: any) => item._id !== row._id)
              self.setState({
                data: temp
              })
              Notification({
                title: '恭喜您',
                message: '记录删除成功',
                type: 'success'
              });
            } else {
              Notification.error({
                title: '删除失败',
                message: '请重新操作',
              })
            }
          });
      }
    })
  }

  filter() {
    const self = this
    request({ url: `` })
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
          <label>题目:</label>
          <Input className='cms-table-filter-input' placeholder='请输入题目' onChange={this.handleInputChange.bind(this)} />
          <Button type='primary' onClick={this.filter.bind(this)}>确定</Button>
        </div>
        <Table columns={this.columns} data={this.state.data} height={500} loading={this.state.loading} />
        <Page className='cms-table-page' total={this.state.total} pageSizes showJumper showTotal hideOnSinglePage />
      </div>
    )
  }
}

export default List