import {
  searchUsers,
  getUser,
  DetailedGitHubUser,
  getRepositories,
  getFollowers,
  getFollowing,
  USER_PER_PAGE,
} from './github';

export interface SearchUserPage {
  total: number;
  isStart: boolean;
  isEnd: boolean;
  page: number;
  totalPage: number;
  users: UserProfile[];
}

export interface User {
  user: DetailedGitHubUser;
  followers: string[];
  following: string[];
  repositories: string[];
}

export interface UserProfile {
  username: string;
  avatarUrl: string;
  followerCount: number;
  followingCount: number;
}

const userProfileDTO = (raw: DetailedGitHubUser): UserProfile => ({
  username: raw.login,
  avatarUrl: raw.avatar_url,
  followerCount: raw.followers,
  followingCount: raw.following,
});

export const searchUsersByUsername = async (
  username: string,
  page: number,
): Promise<SearchUserPage> => {
  const result = await searchUsers(username, page);

  const total = result.total_count;

  return {
    total,
    isStart: page === 1,
    page,
    totalPage: Math.floor(total / USER_PER_PAGE) + 1,
    isEnd: page * USER_PER_PAGE >= total,
    users: result.items.map(userProfileDTO),
  };
};

export const getUserByUsername = async (
  username: string,
): Promise<DetailedGitHubUser | null> => {
  try {
    const result = await getUser(username);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getRepositoriesByUsername = async (
  username: string,
): Promise<string[]> => {
  const repositories = await getRepositories(username);
  return repositories.map((repo) => repo.name);
};

export const getFollowersByUsername = async (
  username: string,
): Promise<string[]> => {
  const result = await getFollowers(username);
  return result.map((user) => user.login);
};

export const getFollowingsByUsername = async (
  username: string,
): Promise<string[]> => {
  const result = await getFollowing(username);
  return result.map((user) => user.login);
};
