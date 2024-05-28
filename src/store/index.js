import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice.js";
import messagesReducer from "./messagesSlice.js";
import createMySocketMiddleware from "../middlewares/socketMiddleWare.js";

const socketMiddleware = createMySocketMiddleware("https://fluffy-hotteok-9d2456.netlify.app");

const store = configureStore({
  reducer: {
    users: usersReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export default store;
