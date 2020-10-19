import React, {useEffect, useContext, useRef} from 'react'
import { Redirect } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import Messages from '../Messages/Messages'
import Users from '../Users/Users'
import {addMessage} from '../Messages/messagesSlice'
import {ChatContext} from '../../context/ChatContext'
import {MessageType} from '../../types'
import {selectUsername} from '../Landing/landingSlice'
import {setMessage, clearMessage, selectMessage} from './chatSlice'
import {idleDisconnectMilliseconds} from '../../config'
import './Chat.css'

const Chat = () => {
    const dispatch = useDispatch()
    const chatSocket = useContext(ChatContext)
    
    const message = useSelector(selectMessage)
    const username = useSelector(selectUsername)
    let idleTimeout:ReturnType<typeof setTimeout>

    useEffect(()=>{
        chatSocket.onIncomingMessage().subscribe((message:MessageType)=>{handleIncomingMessage(message)})
        listenToUserActivity()
        handleIdleTimeout()
        return ()=>{chatSocket.disconnectUser()}
    },[])


    const handleIncomingMessage = (message: MessageType) => {        
        dispatch(addMessage(message))
    }

    const handleIdleTimeout = (): void => {
        clearTimeout(idleTimeout)
            idleTimeout = setTimeout(()=>{
                chatSocket.idleTimeout()
                window.location.href = '/'
            },idleDisconnectMilliseconds)
    }

    const listenToUserActivity = () => 'mousemove keypress click wheel'.split(" ").forEach((e)=>window.addEventListener(e,handleIdleTimeout))
 
    const handleSubmit = (event:React.FormEvent):void => {
        event.preventDefault()
        dispatch(clearMessage())
        chatSocket.sendMessage({
            id: Date.now(),
            username: username,
            message: message,
            timeStamp: Date.now(),
        })
    }

    const handleMessageInput = (e:React.ChangeEvent<HTMLInputElement>):void=>{
        dispatch(setMessage(e.target.value))
        chatSocket.userTyping()
    }

    return(
        <div className='Chat'>
            <button onClick={()=>window.location.href='/'}>Disconnect</button>
            <div className='online-list'>
                <Users/>
            </div>
            <div className='messages' id='messages'>
                    <Messages />
            </div>
            <form onSubmit={(e)=>handleSubmit(e)} autoComplete='off' className='message-form'>
                <input type="text" name="compose" id="compose" value={message} onChange={(e)=>handleMessageInput(e)} className='message-input'/>
                <button type='submit' className='send-button'>Send</button>
            </form>
            {username ? null :<Redirect to='/'/>}
        </div>
    )
}

export default Chat