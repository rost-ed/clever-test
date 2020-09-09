import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import reducer from '../reducers'
import rootSaga from '../sagas'
import App from '../App'


const preloadedState = window.___PRELOADED_STATE___
delete window.___PRELOADED_STATE___

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)        