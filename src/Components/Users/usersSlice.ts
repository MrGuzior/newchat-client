import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../store'
import {UserType} from '../../types'

interface UsersState {
    users: UserType[]
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