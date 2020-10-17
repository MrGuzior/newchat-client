import React from 'react'
import Login from './Login'
import Background from './Background/Background'
import './Landing.css'

const Landing = () => {
    return (
        <div className='landing'> 
            <Login/>
            <Background/>
        </div>
    )
}

export default Landing