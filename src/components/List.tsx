import React, { Component } from 'react'
import { Table } from 'dru'

class List extends Component {
  render() {
    const columns = [
      {
        label: '姓名',
        prop: 'name',
        width: 150,
      },
      {
        label: '年龄',
        prop: 'age',
        width: 160
      },
      {
        label: '地址',
        prop: 'address',
      },
    ];
    const data = [
      {
        name: '张三',
        age: '20',
        address: '广州市天河区珠江新城001号',
      },{
        name: '李四',
        age: '22',
        address: '广州市天河区珠江新城002号',
      },{
        name: '赵五',
        age: '24',
        address: '广州市天河区珠江新城003号',
      },{
        name: '冯六',
        age: '26',
        address: '广州市天河区珠江新城004号',
      },{
        name: '周七',
        age: '16',
        address: '广州市天河区珠江新城005号',
      },
    ]
    return (
      <Table columns={columns} data={data} height={160} />
    )
  }
}

export default List