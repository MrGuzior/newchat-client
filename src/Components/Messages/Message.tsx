import React from 'react'
import {useSelector} from 'react-redux'
import {selectUsername} from '../Landing/landingSlice'
import {MessageType} from '../../types'
import moment from 'moment'
import './Message.css'

interface MessageProps {
    message: MessageType
}

const Message = ({message}:MessageProps) => {
    const username = useSelector(selectUsername)
    return(
        <div className={
            `message 
            ${message.username === username  ? 'sent-message' : 'recieved-message'}
            ${message.username === 'Server' || message.username !== 'typing' && 'server-message'}
            `
        }>
            {message.username !== username || message.username !== 'typing' && <p className='message-username'>{message.username}</p>}
            <p className='message-message'>{message.message}</p>
            {message.username !== 'typing' &&  <p className='message-time'>{moment(message.timeStamp).format('LTS')}</p>}
        </div>
    )
}

export default Message