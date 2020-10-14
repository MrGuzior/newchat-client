import React, { useState, useContext } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {addUser, setUser, updateUserList} from './loginSlice'
import {ChatContext} from '../socket/ChatContext'
import {User} from '../types/types'

const Landing = () => {
    const dispatch = useDispatch()
    const chatSocket = useContext(ChatContext)

    const [username, setUsername] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleSignIn = (status:string, users: User[]|null) => {
        switch(status){ 
            case '200':
                dispatch(setUser(username))
                dispatch(updateUserList(users))
                setRedirect(true)
                break;
            case '409':
                setErrorMessage('Username taken')
                break;
            default:
                console.log('whwopsi')
                setErrorMessage('Ooops, something went wrong.')
        }
    }

    const handleSubmit = (event: React.FormEvent):void => {
        event.preventDefault()
        chatSocket.signIn({
            username,
        }, handleSignIn)
    }

    const testing = (e: React.MouseEvent) => {
        e.preventDefault()
    }

    return(
        <div className='Landing'>
            {redirect ? <Redirect to={`/chat`} /> : null}
            <p>{errorMessage}</p>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <button type='submit'>Join chat</button>
            </form>
            <button onClick={(e)=>testing(e)}>TEST</button>
        </div>
    )
}

export default Landing