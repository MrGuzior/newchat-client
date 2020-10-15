import React, { useState, useContext } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {updateUsersList} from '../Users/usersSlice'
import {ChatContext} from '../socket/ChatContext'
import {User} from '../types'
import {setUsername, selectUsername} from './landingSlice'

const Landing = () => {
    const dispatch = useDispatch()
    const chatSocket = useContext(ChatContext)

    //const [username, setUsername] = useState('')
    const username = useSelector(selectUsername)


    const [errorMessage, setErrorMessage] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleSignIn = (status:string, users: User[]|null) => {
        switch(status){ 
            case '200':
                //dispatch(setUser(username))

                dispatch(updateUsersList(users))


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

    const handleSubmit = (e: React.FormEvent):void => {
        e.preventDefault()
        chatSocket.signIn({
            username,
        }, handleSignIn)
    }

    const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setUsername(e.target.value))
    }

    return(
        <div className='Landing'>
            {redirect ? <Redirect to={`/chat`} /> : null}
            <p>{errorMessage}</p>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" value={username} onChange={(e)=>handleUsernameInput(e)}/>
                <button type='submit'>Join chat</button>
            </form>
        </div>
    )
}

export default Landing