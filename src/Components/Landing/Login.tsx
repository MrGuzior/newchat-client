import React, { useContext } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {updateUsersList} from '../Users/usersSlice'
import {ChatContext} from '../../context/ChatContext'
import {UserType} from '../../types'
import {
    setUsername,
    setErrorMessage,
    setRedirect, 
    selectUsername,
    selectErrorMessage,
    selectRedirect
} from './landingSlice'
import {motion} from 'framer-motion'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import './Login.css'

const Login = () => {
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
                dispatch(setErrorMessage('Ooops, something went wrong.'))
        }
    }

    const handleSubmit = (e: React.FormEvent):void => {
        e.preventDefault()
        if(username === '') {
            dispatch(setErrorMessage("Username can't be empty"))
        }else{
            chatSocket.signIn({
                username,
            }, handleSignIn)
        }
    }

    const handleUsernameInput = (e: any): void => {
            dispatch(setUsername(e.target.value))
    }

    return(
        <motion.div 
            className='login'
            animate={{y:'50vh'}}
            initial={{y:'50vh'}}
            transition={{
                duration:1,
                type:'spring'
            }}
            >
            {redirect ? <Redirect to={`/chat`} /> : null}
            <p data-testid='error-display'>{errorMessage}</p>
            <form onSubmit={(e)=>handleSubmit(e)}>

            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon2"
                    data-testid='username-input'
                    value={username}
                    onChange={(e)=>handleUsernameInput(e)}
                    autoFocus
                />
                <InputGroup.Append>
                    <Button 
                        variant="outline-secondary"
                        type='submit'
                        data-testid='login-button'
                    >Log in</Button>
                </InputGroup.Append>
            </InputGroup>


            </form>
        </motion.div>
    )
}

export default Login
