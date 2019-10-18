import * as React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import LoadableComponent from '../libs/LoadableComponent'
import Home from '../components/Home'

const List = LoadableComponent(() => import('../components/List'))
const ListAdd = LoadableComponent(() => import('../components/ListAdd'))
const CategoryAdd = LoadableComponent(() => import('../components/CategoryAdd'))
const CategoryList = LoadableComponent(() => import('../components/CategoryList'))

class ComponentsRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={(() =>
          <Redirect to='/components/home' />
        )} />
        <Route exact path={`/components/home`} component={Home} />
        <Route exact path={`/components/list`} component={List} />
        <Route exact path={`/components/list-add`} component={ListAdd} />
        <Route exact path={`/components/category-add`} component={CategoryAdd} />
        <Route exact path={`/components/category-list`} component={CategoryList} />
        {/* <Route path='/components' exact component={(() =>
          <Redirect to='/components/overview' />
        )} />
        {Object.keys(Lead).map(key => {
          return <Route key={key} exact path={`/components/${key}`} component={Lead[key]} />
        })}
        {Object.keys(Demo).map(key => {
          return <Route key={key} exact path={`/components/${key}`} component={Demo[key]} />
        })} */}
      </Switch>
    );
  }
}

export default ComponentsRouter;
