import React, {useEffect, useRef} from 'react'
import {MessageType, UserType} from '../../types'
import Message from './Message'
import {useSelector} from 'react-redux'
import {selectMessages} from './messagesSlice'
import {selectUsers} from '../Users/usersSlice'
import './Messages.css'

const Messages = () => {
    const messages = useSelector(selectMessages)
    const users = useSelector(selectUsers)
    const bottomScrollRef = useRef<HTMLDivElement>(null)
    
    useEffect(()=>{
        scrollToBottom()
    },[messages])
    
    const scrollToBottom = () => bottomScrollRef.current && bottomScrollRef.current.scrollIntoView({behavior: 'smooth'})

    return (
        <div className='messages' >
            <h1 className='logo-messages'>{`<SaltChat/>`}</h1>
            {messages.map((message:MessageType, index:number) => {
                return(
                <   Message key={index} message={message} id={index}/>
                )
            })}
                {
                    users.map((user:UserType, index:number)=>{
                        if(user.isTyping){
                            return(
                                <Message 
                                    id={index} 
                                    key={index} 
                                    message={{
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