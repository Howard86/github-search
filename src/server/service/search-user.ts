import LRU from 'lru-cache';
import { GitHubUser } from './github';
import { searchUsers, USER_PER_PAGE } from './github';

export interface SearchUserPage {
  total: number;
  isStart: boolean;
  isEnd: boolean;
  page: number;
  totalPage: number;
  users: UserProfile[];
}

export interface UserProfile {
  username: string;
  avatarUrl: string;
}

const MAX_CACHED_PAGES = 100;
export const TEN_MINUTES = 10 * 60 * 1000;

const cachedSearchUserPage = new LRU<string, SearchUserPage>({
  max: MAX_CACHED_PAGES,
  maxAge: TEN_MINUTES,
});

const userProfileDTO = (raw: GitHubUser): UserProfile => ({
  username: raw.login,
  avatarUrl: raw.avatar_url,
});

export const searchUsersByUsername = async (
  username: string,
  page: number,
): Promise<SearchUserPage> => {
  const cache = cachedSearchUserPage.get(`${page}-${username}`);
  if (cache) {
    return cache;
  }

  const result = await searchUsers(username, page);
  const total = result.total_count;
  const users = {
    total,
    isStart: page === 1,
    page,
    totalPage: Math.floor(total / USER_PER_PAGE) + 1,
    isEnd: page * USER_PER_PAGE >= total,
    users: result.items.map(userProfileDTO),
  };
  cachedSearchUserPage.set(`${page}-${username}`, users);
  return users;
};

export const clearSearchCache = (): number => {
  const count = cachedSearchUserPage.keys().length;
  cachedSearchUserPage.reset();
  return count;
};
