import * as React from 'react'
import { Breadcrumb, Divider } from 'dru'

export interface TopBreadcrumbProps {
  lastName?: string
}

class TopBreadcrumb extends React.Component<TopBreadcrumbProps>{
  render() {
    const { lastName } = this.props
    return (
      <div>
        <div className='cms-table-title'>
          <Breadcrumb isRr className='cms-table-title-bread'>
            <Breadcrumb.Item href='/'>首页</Breadcrumb.Item>
            {lastName && (<Breadcrumb.Item>{lastName}</Breadcrumb.Item>)}
          </Breadcrumb>
        </div>
        <Divider />
      </div>
    )
  }
}

export default TopBreadcrumb
