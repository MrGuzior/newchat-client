// import {createSlice, PayloadAction} from '@reduxjs/toolkit'
// import {AppThunk, RootState} from '../../app/store'
// import {User} from '../types'

// interface UsersState {
//     users: User[],
//     username: string
// }

// const initialState: UsersState = {
//     users: [],
//     username: ''
// }

// export const usersSlice = createSlice({
//     name:'users',
//     initialState,
//     reducers: {
//         addUser: (state,action) => {
//             state.users.push(action.payload)
//         },
//         setUser: (state, action) => {
//             state.username = action.payload
//         },
//         updateUserList: (state, action) => {
//             console.log('updating users')
//             state.users = action.payload
//         }
//     }
// })

// export const {addUser, setUser, updateUserList} = usersSlice.actions

// export const selectUsers = (state: RootState) => state.users.users
// export const selectUsername = (state: RootState) => state.users.username

// export default usersSlice.reducer