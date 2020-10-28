import React from 'react'
import Login from './Login'
import Background from './Background/Background'
import './Landing.css'

const Landing = () => {
    return (
        <div className='landing'>
            <h1 className='logo'>{`<SaltChat/>`}</h1>
            <h2 className='heading'>Stay connected while keeping the distance</h2> 
            <Login/>
            <Background/>
        </div>
    )
}

export default Landing