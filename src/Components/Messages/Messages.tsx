import React, {useEffect, useContext} from 'react'
import {Message as MessageType, User} from '../types'
import Message from './Message'
import {useSelector} from 'react-redux'
import {selectMessages} from './messagesSlice'
import {ChatContext} from '../socket/ChatContext'

const Messages = () => {
    const messages = useSelector(selectMessages)
    const chatSocket = useContext(ChatContext)

    useEffect(()=>{
        chatSocket.onIncomingIsTyping().subscribe((user:User)=>handleIsTyping(user))
    },[])

    const handleIsTyping = (user: User) => {
       console.log(user.username)
    }


    return (<div>
        {messages.map((message:MessageType, index:number) => {
            return(
                <Message key={index} message={message}/>
            )
        })}
    </div>
    
    )
}

export default Messages