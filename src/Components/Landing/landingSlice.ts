import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'

interface LandingType {
    username: string,
    errorMessage: string,
    redirect: boolean
}

const initialState: LandingType = {
    username: '',
    errorMessage: '',
    redirect: false
}

export const landingSlice = createSlice({
    name: 'landing',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        },
        cleanErrorMessage: (state) => {
            state.errorMessage = ''
        },
        setRedirect: (state, action) => {
            state.redirect = action.payload
        }
    }
})

export const {setUsername, setErrorMessage, cleanErrorMessage, setRedirect} = landingSlice.actions

export const selectUsername = (state: RootState) => state.landing.username
export const selectErrorMessage = (state: RootState) => state.landing.errorMessage
export const selectRedirect = (state: RootState) => state.landing.redirect

export default landingSlice.reducer