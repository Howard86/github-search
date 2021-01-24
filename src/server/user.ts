import LRU from 'lru-cache';
import { TEN_MINUTES } from './search-user';
import {
  GitHubUser,
  DetailedGitHubUser,
  getUser,
  getRepositories,
  getFollowers,
  getFollowing,
} from './github';

export interface User extends UserFollow {
  info: DetailedGitHubUser;
  repositories: string[];
}

export interface UserFollow {
  followers: string[];
  followings: string[];
}

export interface UserProfile {
  username: string;
  avatarUrl: string;
}

const MAX_CACHED_USERS = 100;

const cachedUser = new LRU<string, User>({
  max: MAX_CACHED_USERS,
  maxAge: TEN_MINUTES,
});

const cachedUserFollow = new LRU<string, UserFollow>({
  max: MAX_CACHED_USERS,
  maxAge: TEN_MINUTES,
});

const mapFollow = (user: GitHubUser): string => user.login;

export const getUserFollowersAndFollowing = async (
  username: string,
): Promise<UserFollow> => {
  const cache = cachedUserFollow.get(username);

  if (cache) {
    return cache;
  }

  const [rawFollowers, rawFollowing] = await Promise.all([
    getFollowers(username),
    getFollowing(username),
  ]);
  const userFollow = {
    followers: rawFollowers.map(mapFollow),
    followings: rawFollowing.map(mapFollow),
  };

  cachedUserFollow.set(username, userFollow);
  return userFollow;
};

export const getUserByUsername = async (username: string): Promise<User> => {
  const cache = cachedUser.get(username);

  if (cache) {
    return cache;
  }

  const [info, { followers, followings }, repositories] = await Promise.all([
    getUser(username),
    getUserFollowersAndFollowing(username),
    getRepositories(username),
  ]);

  const user = {
    info,
    followers,
    followings,
    repositories: repositories.map((repository) => repository.name),
  };

  cachedUser.set(username, user);

  return user;
};
