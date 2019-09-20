import * as React from 'react';
import { Route,Switch } from 'react-router-dom'
import Index from './components/Index'
// import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' component={Index}/>
        {/* <PrivateRoute path='/' component={Index}/> */}
      </Switch>
    )
  }
}

export default App;
