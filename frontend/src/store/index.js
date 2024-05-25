import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import usersReducer from './usersSlice.js';
import messagesReducer from './messagesSlice.js';
import createMySocketMiddleware from '../middlewares/socketMiddleWare.js';

const socketMiddleware = createMySocketMiddleware('http://localhost:3000');

const store = configureStore({
  reducer: {
    users: usersReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware),
});

export default store;