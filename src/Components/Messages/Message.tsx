import React from 'react'
import {Message as MessageType} from '../types'

interface MessageProps {
    message: MessageType
}

const Message = ({message}:MessageProps) => {
    //const {message} = props
    const hours = new Date(message.timeStamp).getHours();
    const minutes = new Date(message.timeStamp).getMinutes();
    const seconds = new Date(message.timeStamp).getSeconds();
    return(
        <div>
            <p>{hours}:{minutes}:{seconds} | {message.message} | {message.username}</p>
        </div>
    )
}

export default Message