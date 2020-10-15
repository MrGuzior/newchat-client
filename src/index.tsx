import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './Components/App/App'
import { store } from './store'
import { Provider } from 'react-redux'
import * as serviceWorker from './service/serviceWorker'

ReactDOM.render(
      <Provider store={store}>
      <App />
      </Provider>
    ,
  document.getElementById('root')
)

serviceWorker.unregister()
