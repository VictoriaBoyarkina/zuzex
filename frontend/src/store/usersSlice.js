import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: usersAdapter.addOne,
    addUsers: usersAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
    .addCase('SOCKET_ALL_USERS', (state, action) => {
      usersAdapter.setAll(state, action.payload);
    })
    .addCase('SOCKET_NEW_USER', (state, action) => {
      usersAdapter.addOne(state, action.payload);
    })
  },
});

export const { actions } = usersSlice;

export const selectors = usersAdapter.getSelectors((state) => state.users);

export default usersSlice.reducer;
