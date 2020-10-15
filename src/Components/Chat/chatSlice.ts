import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../app/store'

interface MessageType {
    message: string
}

const initialState: MessageType = {
    message: ''
}

export const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        },
        clearMessage: (state) => {
            state.message = ''
        }
    }
})

export const {setMessage, clearMessage} = chatSlice.actions

export const selectMessage = (state: RootState) => state.chat.message

export default chatSlice.reducer