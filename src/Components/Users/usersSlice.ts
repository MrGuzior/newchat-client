import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
import {User} from '../types'

interface UsersState {
    users: User[]
}

const initialState: UsersState = {
    users: []
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateUsersList: (state, action) => {
            state.users = action.payload
        }
    }
})

export const {updateUsersList} = usersSlice.actions

export const selectUsers = (state: RootState) => state.users.users

export default usersSlice.reducer