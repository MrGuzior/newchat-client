import React, {useEffect, useContext} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ChatContext} from '../socket/ChatContext'
import {UserType} from '../types' 
import {updateUsersList, selectUsers} from '../Users/usersSlice'

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

    return (<div>
        {usersList.map((user,index)=>{
            if(user.connected){
                return(<li key={index}>{user.username}</li>)
            }
        })}
    </div>)
}

export default Users
