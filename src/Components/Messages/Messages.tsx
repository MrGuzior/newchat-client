import React, {useEffect, useContext, useRef} from 'react'
import {MessageType, UserType} from '../../types'
import Message from './Message'
import {useSelector} from 'react-redux'
import {selectMessages} from './messagesSlice'
import {ChatContext} from '../../context/ChatContext'
import './Messages.css'

const Messages = () => {
    const messages = useSelector(selectMessages)
    const chatSocket = useContext(ChatContext)
    const bottomScrollRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        chatSocket.onIncomingIsTyping().subscribe((user:UserType)=>handleIsTyping(user))
    },[])
    
    useEffect(()=>{
        scrollToBottom()
    },[messages])

    const scrollToBottom = () => bottomScrollRef.current && bottomScrollRef.current.scrollIntoView({behavior: 'smooth'})

    const handleIsTyping = (user: UserType) => {
       console.log(user.username)
    }

    return (
            
        <div className='messages' >
        {messages.map((message:MessageType, index:number) => {
            return(
                <Message key={index} message={message}/>
            )
        })}
        <div ref={bottomScrollRef}></div>
    </div>
            
    
    )
}

export default Messages