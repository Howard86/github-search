import { createSlice } from '@reduxjs/toolkit';
import type { UserProfile } from '@/server/model/user';
import { search } from './action';

export interface UserState {
  isSearching: boolean;
  users: UserProfile[];
  isEnd: boolean;
  totalPage: number;
  message?: string;
}

const initialState: UserState = {
  isSearching: false,
  isEnd: true,
  totalPage: 0,
  users: [],
};

const { reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(search.pending, (state) => {
      state.isSearching = true;
      state.message = undefined;
    });
    builder.addCase(search.fulfilled, (state, action) => {
      state.isSearching = false;
      state.users = action.payload.users;
      state.isEnd = action.payload.isEnd;
      state.totalPage = action.payload.totalPage;
    });
    builder.addCase(search.rejected, (_, action) => {
      return {
        ...initialState,
        message: `Cannot find ${action.meta.arg.username}, try another one?`,
      };
    });
  },
});

export default reducer;
