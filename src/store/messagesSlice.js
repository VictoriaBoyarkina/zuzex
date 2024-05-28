import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
    .addCase('SOCKET_ALL_MESSAGES', (state, action) => {
      messagesAdapter.setAll(state, action.payload);
    })
    .addCase('SOCKET_MESSAGE_RECEIVED', (state, action) => {
      messagesAdapter.addOne(state, action.payload);
    });
  },
});

export const { actions } = messagesSlice;

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
