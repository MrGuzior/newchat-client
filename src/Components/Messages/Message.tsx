import React from 'react'
import {useSelector} from 'react-redux'
import {selectUsername} from '../Landing/landingSlice'
import {MessageType} from '../../types'
import './Message.css'

interface MessageProps {
    message: MessageType
}

const Message = ({message}:MessageProps) => {
    const username = useSelector(selectUsername)
    const hours = new Date(message.timeStamp).getHours().toString()
    const minutes = new Date(message.timeStamp).getMinutes().toString()
    const seconds = new Date(message.timeStamp).getSeconds().toString()
    return(
        <div className={
            `message 
            ${message.username === username? 'sent-message' : 'recieved-message'}
            ${message.username === 'Server' && 'server-message'}
            `
        }>
            <p>{hours.length === 1 ? `0${hours}` : hours
            }:{minutes.length === 1 ? `0${minutes}` : minutes
            }:{seconds.length === 1 ? `0${seconds}` : seconds
            } | {message.message} | {message.username}
            </p>
        </div>
    )
}

export default Message