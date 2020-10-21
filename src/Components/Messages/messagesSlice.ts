import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppThunk, RootState} from '../../store'
import {MessageType, UserType} from '../../types'

interface MessagesState {
   messages: MessageType[]
}

const initialState: MessagesState = {
    messages: []
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    }
})

export const {addMessage} = messagesSlice.actions;

export const selectMessages = (state: RootState) => state.messages.messages

export default messagesSlice.reducer