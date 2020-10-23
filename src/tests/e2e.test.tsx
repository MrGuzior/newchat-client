// __tests__/fetch.test.js
import React from 'react'
import {} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { Provider } from 'react-redux'
import {store} from '../store'
import { render, fireEvent, waitFor} from '@testing-library/react'
import MutationObserver from "mutation-observer";
global.MutationObserver = MutationObserver;
import {ChatContext} from '../context/ChatContext'
import {SocketService} from '../service/SocketService'
import Login from '../Components/Landing/Login'
import Chat from '../Components/Chat/Chat'

describe('User steps', () => {
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
    it('logs in, sends, recieves message, displays userlist', async () => {
        const usernameInput: HTMLInputElement = getByTestId('username-input')
        const submitButton = getByTestId('login-button')
        fireEvent.change(usernameInput, { target: { value: 'SomeUser' } })
        expect(usernameInput.value).toBe('SomeUser')
        //console.log(`${usernameInput.value} equals SomeUser`)
        fireEvent.click(submitButton)
        
        await waitFor(async ()=>{
            window.HTMLElement.prototype.scrollIntoView = jest.fn()
            const messageInput: HTMLInputElement = getByTestId('message-input')
            const messageButton = getByTestId('message-button')
            const disconnectButton = getByTestId('disconnect-button')
            fireEvent.change(messageInput, { target: { value: 'Some random message' } })
            expect(messageInput.value).toBe('Some random message')
            //console.log(`${messageInput.value} equals Some random message`)
            fireEvent.click(messageButton)
            
            await waitFor(async () => {
                const message = getByTestId('0-message')
                const username = getByTestId('0-user')
                expect(message.textContent).toBe('Some random message')
                //console.log(`${message.textContent} equals Some random message`)
                expect(username.textContent).toBe('SomeUser')
                //console.log(`${username.textContent} equals SomeUser`)
            })
        }) 
    })
})
