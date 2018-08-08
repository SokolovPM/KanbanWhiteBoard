import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import { Router, Route, browserHistory } from 'react-router'

import { store } from './store'
import Layout from './components/layout'
import Projects from './components/projects'
import ProjectBoard from './components/project-board'

import { getProjectList } from './actions';

const initProjectList = () => (
  store.dispatch(getProjectList())
)

ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={Layout}>
        <Route component={Projects} path="/" />
        <Route component={ProjectBoard} path="/project/:name" />
      </Route>
    </Router>
  </Provider>
  ,
  document.getElementById('app')
)
