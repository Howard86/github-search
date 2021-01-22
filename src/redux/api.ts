import type { SingleGitHubUser, GitHubUser } from '@/server/user';

export interface SearchUserResponse extends LocalAPIResponse {
  isEnd: boolean;
  total: number;
  users: GitHubUser[];
}
export interface GetUserResponse extends LocalAPIResponse {
  user: SingleGitHubUser;
}

interface LocalAPIResponse {
  success: boolean;
}

export const getLocal = async <T = unknown>(path: string): Promise<T> => {
  const result = await fetch(`/api/${path}`);
  return await result.json();
};
