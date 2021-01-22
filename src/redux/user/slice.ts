import { createSlice } from '@reduxjs/toolkit';
import type { GitHubUser } from '@/server/user';
import { search } from './action';

export interface UserState {
  isSearching: boolean;
  users: GitHubUser[];
  message?: string;
}

const initialState: UserState = {
  isSearching: false,
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
    });
    builder.addCase(search.rejected, (state, action) => {
      state.isSearching = false;
      state.message = `Cannot find ${action.meta.arg}, try another one?`;
    });
  },
});

export default reducer;
