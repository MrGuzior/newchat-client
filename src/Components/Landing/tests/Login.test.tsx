// __tests__/fetch.test.js
import React,{useRef} from 'react'
import {} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { Provider } from 'react-redux'
import {store} from '../../../store'
import { render, fireEvent, waitFor, screen, getByTestId, getByText, getByAltText, getByDisplayValue, getAllByTestId  } from '@testing-library/react'
import MutationObserver from "mutation-observer";
global.MutationObserver = MutationObserver;
import {ChatContext} from '../../../context/ChatContext'
import {SocketService} from '../../../service/SocketService'
import Login from '../Login'
import Chat from '../../Chat/Chat'
import { debug } from 'console'

describe('User steps', () => {
    test('Login renders', async () => {
        const chat = new SocketService()
        chat.init()
        const {getByTestId} = 
        render(
            <Provider store={store}>
             <ChatContext.Provider value={chat}>
                 <Router>
                     <Route path='/'>
                        <Login/>
                     </Route>
                    <Switch>
                    <Route path="/chat">
                        <Chat/>
                    </Route>
                    </Switch>
                 </Router>
             </ChatContext.Provider>
          </Provider>
        )
    
    
        const usernameInput: HTMLInputElement = getByTestId('username-input')
        const submitButton = getByTestId('login-button')
        fireEvent.change(usernameInput, { target: { value: 'SomeUser' } })
        expect(usernameInput.value).toBe('SomeUser')
        fireEvent.click(submitButton)
    
        await waitFor(async ()=>{
            window.HTMLElement.prototype.scrollIntoView = jest.fn()
            const messageInput: HTMLInputElement = getByTestId('message-input')
            const messageButton = getByTestId('message-button')
            const disconnectButton = getByTestId('disconnect-button')
            const messages = getByTestId('messages')
    
            fireEvent.change(messageInput, { target: { value: 'Some random message' } })
            expect(messageInput.value).toBe('Some random message')
            fireEvent.click(messageButton)
            await waitFor(()=>{
                const message: HTMLElement = getByTestId('message-text')
                //console.log(message.textContent)
                expect(message.textContent).toBe('Some random message')
            })
        })
    
        //expect(screen.getByText('Online')).toBeInTheDocument();
    
        //debug()
    
    })
    
})
