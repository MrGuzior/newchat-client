import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Chat from '../Chat/Chat'
import Landing from '../Landing/Landing'
import {ChatContext} from '../socket/ChatContext'
import {SocketService} from '../socket/SocketService'
import './App.css';

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
  );
}

export default App;
