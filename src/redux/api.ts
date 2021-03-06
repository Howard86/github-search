import type { User, SearchUserPage } from '@/server/model/user';

export interface SearchUserResponse
  extends LocalAPIResponse,
    Partial<SearchUserPage> {}
export interface GetUserResponse extends LocalAPIResponse {
  user?: User;
}

export interface GetUserFollowCount
  extends LocalAPIResponse,
    Partial<UserFollowCount> {}

export interface UserFollowCount {
  followerCount: number;
  followingCount: number;
}

interface LocalAPIResponse {
  success: boolean;
}

export const getLocal = async <T = unknown>(path: string): Promise<T> => {
  const result = await fetch(`/api/${path}`);
  return await result.json();
};
