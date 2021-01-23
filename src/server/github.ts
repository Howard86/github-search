import { Octokit } from '@octokit/rest';
import { retry } from '@octokit/plugin-retry';
import { throttling } from '@octokit/plugin-throttling';

export interface SearchGitHubUser {
  total_count: number;
  incomplete_results: boolean;
  items: DetailedGitHubUser[];
}

export interface GitHubUser {
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
}

export interface DetailedGitHubUser extends GitHubUser {
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

export interface GitHubFollower {
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
}

export interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GitHubUser;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
}

export const USER_PER_PAGE = 20;

const EnhancedOctokit = Octokit.plugin(retry, throttling);

const octokit = new EnhancedOctokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
  throttle: {
    onRateLimit: (retryAfter, options) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`,
      );

      if (options.request.retryCount === 0) {
        // only retries once
        octokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (_, options) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`,
      );
    },
  },
  retry: {
    doNotRetry: ['429'],
  },
});

export const searchUsers = async (
  username: string,
  page: number,
): Promise<SearchGitHubUser> => {
  const response = await octokit.search.users({
    q: `${username} in:login`,
    per_page: USER_PER_PAGE,
    page,
  });

  return response.data;
};

export const getUser = async (
  username: string,
): Promise<DetailedGitHubUser> => {
  const response = await octokit.users.getByUsername({
    username,
  });

  return response.data;
};

export const getRepositories = async (
  username: string,
): Promise<Repository[]> => {
  const response = await octokit.repos.listForUser({ username });

  return response.data;
};

export const getFollowers = async (username: string): Promise<GitHubUser[]> => {
  const response = await octokit.users.listFollowersForUser({
    username,
  });

  return response.data;
};

export const getFollowing = async (username: string): Promise<GitHubUser[]> => {
  const response = await octokit.users.listFollowingForUser({
    username,
  });

  return response.data;
};
