import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import { Router, Route, browserHistory } from 'react-router'

import { store } from './store'
import { Layout } from './components/layout'


ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={Layout} path="/" />
    </Router>
  </Provider>
  ,
  document.getElementById('app')
)
