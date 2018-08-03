import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import { Router, Route, browserHistory } from 'react-router'

import { store } from './store'
import Layout from './components/layout'
import Projects from './components/projects'


ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={Layout} path="/">
        <Route component={Projects} path="/projects" />
      </Route>
    </Router>
  </Provider>
  ,
  document.getElementById('app')
)
