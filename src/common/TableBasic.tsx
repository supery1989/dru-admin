import * as React from 'react'
import { Breadcrumb, Button, Divider, Input, Table, Page, Popup, Notification, Moment } from 'dru'
import request from '../libs/request'
import '../style/List.scss'

export interface TableBasicProps {
  columns: any
  dict?: string
  history?: any
  url?: string
  deleteUrl?: string
}

class TableBasic extends React.Component<TableBasicProps> {
  static defaultProps = {
    loading: true,
  }
  columns: any
  state = {
    data: [],
    loading: true,
    total: 0,
  }
  constructor(props: TableBasicProps) {
    super(props)
    this.columns = props.columns.concat([
      {
        label: '更新时间',
        prop: 'updateTime',
        render: function(data: any) {
          if (data.updateTime !== undefined) {
            return Moment(data.updateTime, 'YYYY-MM-DD HH:mm:ss')
          }
          return '--'
        }
      },
      {
        type: 'button',
        btnConfig: {
          text: '编辑',
          onClick: (row: any) => {
            this.props.history.push({
              pathname: `/components/${this.props.dict}-add`,
              search: `?_id=${row._id}`
            })
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
    ])
  }

  delete(row: any) {
    const self = this;
    Popup.confirm({
      title: '警告',
      message: (<div>确定要删除吗？</div>),
      icon: 'warningcircle',
      onOk: () => {
        request({ url: this.props.deleteUrl, method: 'post', data: { _id: row._id } })
          .then(function(res) {
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
          })
          .catch(err => {
            Notification.error({
              title: '删除失败',
              message: `请重新操作，失败原因${err}`,
            })
          });
      }
    })
  }

  getData(page = 1, pageSize = 10) {
    const self = this
    self.setState({ loading: true })
    request({ url: `${this.props.url}?pageSize=${pageSize}&pageNumber=${page}` })
      .then(res => {
        self.setState({
          data: res.data,
          total: res.total,
          loading: false
        })
      })
  }

  toPlus() {
    this.props.history.push(`/components/${this.props.dict}-add`)
  }
  
  render() {
    const { data, loading, total } = this.state
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
        {/* <div className='cms-table-filter'>
          <label>题目:</label>
          <Input className='cms-table-filter-input' placeholder='请输入题目' onChange={this.handleInputChange.bind(this)} />
          <Button type='primary' onClick={this.filter.bind(this)}>确定</Button>
        </div> */}
        <Table columns={this.columns} data={data} height={500} loading={loading} />
        <Page className='cms-table-page' total={total} pageSizes showJumper showTotal hideOnSinglePage onChange={this.getData.bind(this)} />
      </div>
    )
  }
}

export default TableBasic
