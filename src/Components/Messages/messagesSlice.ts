import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../../store'
import {MessageType} from '../../types'

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