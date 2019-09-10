import * as React from 'react'
import * as ReactDOM from 'react-dom'
// 使用BrowserRouter会导致页面刷新404，当然可以通过配置nginx来解决
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('root') as HTMLElement)
