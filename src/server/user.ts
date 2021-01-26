import LRU from 'lru-cache';
import { TEN_MINUTES } from './search-user';
import { getUser, GetUser } from './github';

export interface User {
  // initial display
  major: {
    avatarUrl: string;
    name: string;
    login: string;
    bio: string;
    email: string;
    location: string;
    company: string;
    websiteUrl: string;
    twitterUsername: string;
    repositories: UserInfo;
    followers: UserInfo;
    following: UserInfo;
    gists: number;
  };
  // hidden
  minor: {
    id: string;
    databaseId: number;
    createdAt: string;
    updatedAt: string;
  };
  // badges
  badges: {
    hasSponsorsListing: boolean;
    isBountyHunter: boolean;
    isCampusExpert: boolean;
    isDeveloperProgramMember: boolean;
    isEmployee: boolean;
    isHireable: boolean;
    isSiteAdmin: boolean;
    isSponsoringViewer: boolean;
    isViewer: boolean;
  };
}

interface UserInfo {
  total: number;
  data: string[];
}

const MAX_CACHED_USERS = 1000;

const cachedUser = new LRU<string, User>({
  max: MAX_CACHED_USERS,
  maxAge: TEN_MINUTES,
});

export const clearUserCache = (): number => {
  const count = cachedUser.keys().length;
  cachedUser.reset();
  return count;
};

export const getUserByUsername = async (
  username: string,
): Promise<User | null> => {
  const cache = cachedUser.get(username);

  if (cache) {
    return cache;
  }

  const response = await getUser(username);

  if (!response) {
    cachedUser.set(username, null);
    return null;
  }

  const user = getUserDto(response);

  cachedUser.set(username, user);

  return user;
};

function getUserDto(response: GetUser): User {
  const {
    avatarUrl,
    name,
    login,
    bio,
    email,
    location,
    company,
    websiteUrl,
    twitterUsername,
    repositories,
    followers,
    following,
    gists,
    // hidden
    id,
    databaseId,
    createdAt,
    updatedAt,
    // badges
    hasSponsorsListing,
    isBountyHunter,
    isCampusExpert,
    isDeveloperProgramMember,
    isEmployee,
    isHireable,
    isSiteAdmin,
    isSponsoringViewer,
    isViewer,
  } = response.user;

  return {
    major: {
      avatarUrl,
      name,
      login,
      bio,
      email,
      location,
      company,
      websiteUrl,
      twitterUsername,
      repositories: {
        total: repositories.totalCount,
        data: repositories.nodes.map(mapRepository),
      },
      followers: {
        total: followers.totalCount,
        data: followers.nodes.map(mapFollow),
      },
      following: {
        total: following.totalCount,
        data: following.nodes.map(mapFollow),
      },
      gists: gists.totalCount,
    },
    minor: {
      id,
      databaseId,
      createdAt,
      updatedAt,
    },
    badges: {
      hasSponsorsListing,
      isBountyHunter,
      isCampusExpert,
      isDeveloperProgramMember,
      isEmployee,
      isHireable,
      isSiteAdmin,
      isSponsoringViewer,
      isViewer,
    },
  };
}

function mapFollow(user: { login: string }): string {
  return user.login;
}

function mapRepository(repository: { name: string }): string {
  return repository.name;
}
