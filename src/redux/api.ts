import type { DetailedGitHubUser } from '@/server/github';
import type { SearchUserPage } from '@/server/user';

export interface SearchUserResponse
  extends LocalAPIResponse,
    Partial<SearchUserPage> {}
export interface GetUserResponse extends LocalAPIResponse {
  user?: DetailedGitHubUser;
}

interface LocalAPIResponse {
  success: boolean;
}

export const getLocal = async <T = unknown>(path: string): Promise<T> => {
  const result = await fetch(`/api/${path}`);
  return await result.json();
};
