import React from 'react'
import './Message.css'

interface MessageProps {
    floatRight: boolean,
    hide: boolean
}

const Message = ({floatRight, hide}:MessageProps) => {
    document.body.style.overflow = "hidden"

    return (
        <div className={`message ${floatRight && 'float-right'} ${hide && 'hide'}`}>
           <h2>Mock message  </h2>
           </div>
    )
}

export default Message