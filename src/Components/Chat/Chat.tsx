import React, {useState, useEffect, useContext} from 'react'
import { Redirect } from 'react-router-dom';
import Messages from '../Messages/Messages'
import OnlineList from '../OnlineList/OnlineList'
import Users from '../Users/Users'
import {useSelector, useDispatch} from 'react-redux'
import {addMessage} from '../Messages/messagesSlice'
import {ChatContext} from '../socket/ChatContext'
import {Message as MessageType, User} from '../types'
import queryString from 'query-string'
import {setUsername, selectUsername} from '../Landing/landingSlice'
import {setMessage, clearMessage, selectMessage} from './chatSlice'

const Chat = () => {
    const dispatch = useDispatch()
    const chatSocket = useContext(ChatContext)
    let idleTimeout:ReturnType<typeof setTimeout>

    //const [message, setMessage] = useState('')
    const message = useSelector(selectMessage)

    const username = useSelector(selectUsername)

    useEffect(()=>{
        chatSocket.onIncomingMessage().subscribe((message:MessageType)=>{dispatch(addMessage(message))})
        listenToUserActivity()
        handleIdleTimeout()
        return ()=>{chatSocket.disconnectUser()}
    },[])

    const handleIdleTimeout = (): void => {
        clearTimeout(idleTimeout)
            idleTimeout = setTimeout(()=>{
                chatSocket.idleTimeout()
                window.location.href = '/'
            },60000)
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
    
    const testing = (e:React.MouseEvent) => {
        e.preventDefault()
        console.log(username)

    }

    const handleMessageInput = (e:React.ChangeEvent<HTMLInputElement>):void=>{
        //setMessage(e.target.value)
        dispatch(setMessage(e.target.value))
        chatSocket.userTyping()
    }

    return(
        <div className='Chat'>
            <div className='onlineList'>
                <Users/>
            </div>
            <div className='messages'>
                <Messages/>
            </div>
            <form onSubmit={(e)=>handleSubmit(e)} autoComplete='off'>
                <input type="text" name="compose" id="compose" value={message} onChange={(e)=>handleMessageInput(e)}/>
                <button type='submit'>Send</button>
            </form>
            <button onClick={(e)=>testing(e)}>TEST</button>
            <button onClick={()=>window.location.href='/'}>Disconnect</button>
            {username ? null :<Redirect to='/'/>}
        </div>
    )
}

export default Chat