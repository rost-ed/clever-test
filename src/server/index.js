import Express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from '../App'
import reducer from '../reducers'


const app = Express()
const port = 3000

app.use(Express.static('static'))

const initialState = {
  formData: null,
  loading: false,
  breakOperation: null,
  popupText: '',
}

const handleRequest = (req, res) => {
  const store = createStore(reducer, initialState)

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const preloadedState = store.getState()
  res.send(renderFullPage(html, preloadedState))
}

const renderFullPage = (html, preloadedState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/recipes/server-rendering/#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
        <script src="client.js"></script>
      </body>
    </html>
    `
}

app.get('/', handleRequest)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
