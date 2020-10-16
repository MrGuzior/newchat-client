import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import './Message.css'


const Message = () => {

    console.log(window.innerHeight)

    const messageAnimate = {
        y: [500,500,400,400,300,300,200,200,100,100,0,0]
    }

    const messageInitial = {
        y: 600
    }

    const messageTransition = {
        duration: 8,
        type: 'spring',
        stiffness: 50,
        repeat: Infinity
    }

    const h2Variables = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1
        }
    }


    return (
        <motion.div animate={messageAnimate} initial={messageInitial} transition={messageTransition} className='message'>
            <motion.h2 variants={h2Variables} initial='hidden' animate='visible'>Mock message</motion.h2>
        </motion.div>
    )
}

export default Message