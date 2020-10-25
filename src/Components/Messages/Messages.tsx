import React, {useEffect, useContext, useRef, useState} from 'react'
import {MessageType, UserType} from '../../types'
import Message from './Message'
import {useSelector, useDispatch} from 'react-redux'
import {selectMessages} from './messagesSlice'
import {ChatContext} from '../../context/ChatContext'
import {selectUsers} from '../Users/usersSlice'
import './Messages.css'

const Messages = () => {
    const messages = useSelector(selectMessages)
    const chatSocket = useContext(ChatContext)
    const users = useSelector(selectUsers)
    const bottomScrollRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        chatSocket.onIncomingIsTyping().subscribe((user:UserType)=>{
        })
    },[])
    
    useEffect(()=>{
        scrollToBottom()
    },[messages])
    
    const scrollToBottom = () => bottomScrollRef.current && bottomScrollRef.current.scrollIntoView({behavior: 'smooth'})

    return (
        <div className='messages' >
        {messages.map((message:MessageType, index:number) => {
            return(
                <Message key={index} message={message} id={index}/>
            )
        })}{
            users.map((user:UserType, index:number)=>{
                if(user.isTyping){
                return(
                    <Message id={index} key={index} message={{
                        id: index,
                        username: `${user.username}-typing`,
                        message: `${user.username} is typing...`,
                        timeStamp: Date.now(),
                    }}/>
                )
                }
            })
        }

        <div ref={bottomScrollRef}></div>
    </div>
            
    
    )
}

export default Messages