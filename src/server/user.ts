import { Octokit } from '@octokit/core';

export interface SearchGitHubUser {
  total: number;
  isEnd: boolean;
  users: GitHubUser[];
}

export interface GitHubUser {
  username: string;
  avatarUrl: string;
}

// only needs the following field
interface GitHubRawUser {
  login: string;
  avatar_url: string;
}

export interface SingleGitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  plan?: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  };
}

const PER_PAGE = 15;

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

const filterUnusedData = (raw: GitHubRawUser): GitHubUser => ({
  username: raw.login,
  avatarUrl: raw.avatar_url,
});

export const searchUsersByUsername = async (
  username: string,
  page: number,
): Promise<SearchGitHubUser> => {
  const response = await octokit.request('GET /search/users', {
    q: `${username} in:login`,
    per_page: PER_PAGE,
    page,
  });
  return {
    total: response.data.total_count,
    isEnd: page * PER_PAGE >= response.data.total_count,
    users: response.data.items.map(filterUnusedData),
  };
};

export const getUserByUsername = async (
  username: string,
): Promise<SingleGitHubUser | null> => {
  try {
    const response = await octokit.request('GET /users/{username}', {
      username,
    });
    return response.status === 200 ? response.data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getRepositoriesByUsername = async (
  username: string,
): Promise<string[]> => {
  const response = await octokit.request('GET /users/{username}/repos', {
    username,
  });
  return response.data.map((repo) => repo.name);
};

export const getFollowersByUsername = async (
  username: string,
): Promise<string[]> => {
  const response = await octokit.request('GET /users/{username}/followers', {
    username,
  });
  return response.data.map((repo) => repo.login);
};

export const getFollowingsByUsername = async (
  username: string,
): Promise<string[]> => {
  const response = await octokit.request('GET /users/{username}/following', {
    username,
  });
  return response.data.map((repo) => repo.login);
};
