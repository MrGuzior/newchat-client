import React, {useState, useEffect, useContext} from 'react'
import { Redirect } from 'react-router-dom';
import Message from '../Message/Message'
import OnlineList from '../OnlineList/OnlineList'
import {useSelector, useDispatch} from 'react-redux'
import {addMessage} from '../Message/messagesSlice'
import {ChatContext} from '../socket/ChatContext'
import {Message as MessageType, User} from '../types/types'
import queryString from 'query-string'
import { selectUsers, selectUsername} from '../Landing/loginSlice'

const Chat = () => {
    const dispatch = useDispatch()
    const chatSocket = useContext(ChatContext)
    let idleTimeout:ReturnType<typeof setTimeout>

    const [message, setMessage] = useState('')

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
        setMessage('')
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
        setMessage(e.target.value)
        chatSocket.userTyping()
    }

    return(
        <div className='Chat'>
            <div className='onlineList'>
                <OnlineList/>
            </div>
            <div className='messages'>
                <Message/>
            </div>
            <form onSubmit={(e)=>handleSubmit(e)}>
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