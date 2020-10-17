import React from 'react'
import Message from './Message'
import Messages from './Messages'
import {motion} from 'framer-motion'
import './Background.css'

const positions = [
    '110vh','110vh','90vh','90vh','70vh','70vh','50vh','50vh','30vh','30vh','10vh','10vh','-10vh','-10vh', '-30vh', '-30vh'
    , '-50vh', '-50vh', '-70vh', '-70vh', '-90vh', '-90vh','-110vh', '-110vh','-130vh', '-130vh','-150vh', '-150vh', '-170vh'
]

const Background = () => {
    document.body.style.overflow = "hidden"

    const messageAnimate = {
        y: positions
    }

    const messageInitial = {
        y: '130vh'
    }

    const messageTransition = {
        duration: 15,
        type: 'spring',
        stiffness: 50,
        repeat: Infinity,
    }

    return(
        <>
        <motion.div
        animate={messageAnimate} 
        initial={messageInitial} 
        transition={messageTransition}
        className='background'
        >
            <Messages/>
            
        </motion.div>
        </>
    )
}

export default Background