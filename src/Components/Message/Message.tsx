import React from 'react'
import {useSelector} from 'react-redux'
import {selectMessages} from './messagesSlice'

const Message = () => {
    const messages = useSelector(selectMessages)
    return (<div>
        {messages.map((message, index) => {
            const hours = new Date(message.timeStamp).getHours();
            const minutes = new Date(message.timeStamp).getMinutes();
            const seconds = new Date(message.timeStamp).getSeconds();
            return(
            <div key={index}>
                <p key={index}>{hours}:{minutes}:{seconds} | {message.message} | {message.username}</p>
            </div>
            )
        })}
    </div>
    
    )
}

export default Message