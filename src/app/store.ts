import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import messagesReducer from '../Components/Message/messagesSlice'
import usersReducer from '../Components/Landing/loginSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    messages: messagesReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
