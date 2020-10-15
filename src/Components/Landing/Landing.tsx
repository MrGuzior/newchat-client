import React, { useContext } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {updateUsersList} from '../Users/usersSlice'
import {ChatContext} from '../socket/ChatContext'
import {UserType} from '../types'
import {
    setUsername,
    setErrorMessage,
    setRedirect, 
    selectUsername,
    selectErrorMessage,
    selectRedirect
} from './landingSlice'

const Landing = () => {
    const dispatch = useDispatch()
    const chatSocket = useContext(ChatContext)
    const username = useSelector(selectUsername)
    const errorMessage = useSelector(selectErrorMessage)
    const redirect = useSelector(selectRedirect)

    const handleSignIn = (status:string, users: UserType[]|null) => {
        switch(status){ 
            case '200':
                dispatch(updateUsersList(users))
                dispatch(setRedirect(true))
                break;
            case '409':
                dispatch(setErrorMessage('Username taken'))
                break;
            default:
                console.log('whwopsi')
                dispatch(setErrorMessage('Ooops, something went wrong.'))
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