// import React,{useEffect, useContext} from 'react'
// import {useSelector, useDispatch} from 'react-redux'
// import {ChatContext} from '../socket/ChatContext'
// import {User} from '../types'
// import {updateUsersList, selectUsers} from '../Users/usersSlice'

// const OnlineList = () => {
//     const dispatch = useDispatch()
//     const chatSocket = useContext(ChatContext)
//     const usersList = useSelector(selectUsers)

//     useEffect(()=>{
//         chatSocket.onIncomingUsers().subscribe((users:User[])=>{handleIncomingUsers(users)}) 
        
//     },[])
    
//     const handleIncomingUsers = (users: User[]) => {
//         if(users)dispatch(updateUsersList(users))
//     }



//     return (<div>
//         {usersList.map((user,index)=>{
//             if(user.connected){
//                 return(<li key={index}>{user.username}</li>)
//             }
//         })}
//     </div>)
// }

// export default OnlineList