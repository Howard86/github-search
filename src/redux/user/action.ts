import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLocal, GetUserResponse, SearchUserResponse } from '../api';

interface SearchParam {
  username: string;
  page: number;
}

export const search = createAsyncThunk(
  'user/search',
  async ({ username, page }: SearchParam) => {
    const response = await getLocal<SearchUserResponse>(
      `users?username=${username}&page=${page}`,
    );

    if (!response.success) {
      throw new Error('failed to fetch');
    }

    return response;
  },
);

export const getUser = createAsyncThunk(
  'user/get',
  async (username: string) => {
    const response = await getLocal<GetUserResponse>(`users/${username}`);

    if (!response.success) {
      throw new Error('failed to fetch');
    }

    return response.user;
  },
);
