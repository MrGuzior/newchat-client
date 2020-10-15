import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import messagesReducer from '../Components/Messages/messagesSlice'
import landingReducer from '../Components/Landing/landingSlice'
import chatReducer from '../Components/Chat/chatSlice'
import usersReducer from '../Components/Users/usersSlice'

export const store = configureStore({
  reducer: {    
    messages: messagesReducer,
    users: usersReducer,
    landing: landingReducer,
    chat: chatReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
