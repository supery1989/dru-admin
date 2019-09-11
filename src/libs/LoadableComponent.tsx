import React, { Component } from 'react'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

class LoadingPage extends Component {
  componentWillMount() {
    NProgress.start()
  }

  componentDidMount() {
    NProgress.done()
  }

  render() {
    return <div />
  }
}

const LoadableComponent: any = (component: any) => {
  return Loadable({
    loader: component,
    loading: () => <LoadingPage/>
  })
}

export default LoadableComponent
