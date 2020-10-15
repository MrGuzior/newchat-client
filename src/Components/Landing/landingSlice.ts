import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'

interface LandingType {
    username: string
}

const initialState: LandingType = {
    username: ''
}

export const landingSlice = createSlice({
    name: 'landing',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        }
    }
})

export const {setUsername} = landingSlice.actions

export const selectUsername = (state: RootState) => state.landing.username

export default landingSlice.reducer