import React,{useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Chat from '../Chat/Chat'
import Landing from '../Landing/Landing'
import {ChatContext} from '../../context/ChatContext'
import {SocketService} from '../../service/SocketService'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const chat = new SocketService()
  chat.init()

  useEffect(()=>{
    fetch('https://new-chat-salt-server.herokuapp.com/test')
          .then(res => res.json())
          .then(data => console.log(data + ' from the test'))
  },[])
  
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
