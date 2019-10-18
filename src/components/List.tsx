import React, { Component } from 'react'
import { observer } from 'mobx-react'
import request from '../libs/request'
import TableBasic from '../common/TableBasic'
import listStore from '../store/listStore'

export interface ListProps {
  history?: any
}
@observer
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
      width: 160,
      render: function(data: any) {
        return listStore.Categorys[data.primaryClassification]
      }
    },
    {
      label: '二级分类',
      prop: 'secondaryClassification',
      width: 150,
      render: function(data: any) {
        return listStore.Categorys[data.secondaryClassification]
      }
    },
    {
      label: '三级分类',
      prop: 'thirdClassification',
      width: 150,
      render: function(data: any) {
        return listStore.Categorys[data.thirdClassification]
      }
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
  ];

  componentDidMount() {
    listStore.getCategorys()
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

  render() {
    return <TableBasic
      columns={this.columns}
      dict='list'
      history={this.props.history}
      url='/questions/query'
      deleteUrl='/questions/delete'
    />
  }
}

export default List