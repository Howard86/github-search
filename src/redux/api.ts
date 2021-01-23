import type { SearchUserPage } from '@/server/search-user';
import type { User } from '@/server/user';

export interface SearchUserResponse
  extends LocalAPIResponse,
    Partial<SearchUserPage> {}
export interface GetUserResponse extends LocalAPIResponse {
  user?: User;
}

interface LocalAPIResponse {
  success: boolean;
}

export const getLocal = async <T = unknown>(path: string): Promise<T> => {
  const result = await fetch(`/api/${path}`);
  return await result.json();
};
