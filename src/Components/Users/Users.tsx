import React, {useEffect, useContext} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ChatContext} from '../../context/ChatContext'
import {UserType} from '../../types' 
import {updateUsersList, selectUsers} from '../Users/usersSlice'
import './Users.css'

const Users = () => {
    const dispatch = useDispatch()
    const chatSocket = useContext(ChatContext)
    const usersList = useSelector(selectUsers)
    
    useEffect(()=>{
        chatSocket.onIncomingUsers().subscribe((users:UserType[])=>{handleIncomingUsers(users)}) 
    },[])

    const handleIncomingUsers = (users: UserType[]) => {
        if(users)dispatch(updateUsersList(users))
    }

    return (<div className='users-list'>
        <h3 className='users-header'>Online</h3>
        {usersList.map((user,index)=>{
            return user.connected && (<li className='online-user-li' key={index} data-testid={`${index}-user`}>{user.username}</li>)
        })}
    </div>)
}

export default Users
