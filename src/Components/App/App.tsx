import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Chat from '../Chat/Chat'
import Landing from '../Landing/Landing'
import {ChatContext} from '../../context/ChatContext'
import {SocketService} from '../../service/SocketService'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const chat = new SocketService()
  chat.init()

  return (
    <Router>
      <ChatContext.Provider value={chat}>
          <Switch>
            
            <Route exact path='/'>
              <Landing />
            </Route>

            <Route exact path='/chat'>
              <Chat />
            </Route>

          </Switch>
      </ChatContext.Provider>
    </Router>
  )
}

export default App
