import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './Components/App/App'
import { store } from './store'
import { Provider } from 'react-redux'
import * as serviceWorker from './service/serviceWorker'

ReactDOM.render(
  <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
