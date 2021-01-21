import { createAsyncThunk } from '@reduxjs/toolkit';
import type { GitHubUser } from '@/server/user';
import { getLocal } from '../api';

export const search = createAsyncThunk(
  'user/search',
  async (username: string) => {
    const response = await getLocal<GitHubUser[]>(`users?username=${username}`);

    if (!response.success) {
      throw new Error('failed to fetch');
    }

    return response.users;
  },
);

export const getUser = createAsyncThunk(
  'user/get',
  async (username: string) => {
    const response = await getLocal<GitHubUser>(`users/${username}`);

    if (!response.success) {
      throw new Error('failed to fetch');
    }

    return response.user;
  },
);
