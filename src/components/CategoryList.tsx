import React, { Component } from 'react'
import TableBasic from '../common/TableBasic'

export interface CategoryListProps {
  history?: any
}

class CategoryList extends Component<CategoryListProps> {
  columns = [
    {
      type: 'index',
    },
    {
      label: '类别',
      prop: 'class',
      width: 250,
    },
    {
      label: '父id',
      prop: 'pid',
      width: 400,
    },
    {
      label: '级别',
      prop: 'type',
      width: 100,
    }
  ];

  render() {
    return <TableBasic
      columns={this.columns}
      dict='category'
      history={this.props.history}
      url='/category/query'
      deleteUrl='/category/delete'
    />
  }
}

export default CategoryList