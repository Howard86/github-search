import { Octokit } from '@octokit/rest';
import { retry } from '@octokit/plugin-retry';
import { throttling } from '@octokit/plugin-throttling';
import { ClientError, gql, GraphQLClient } from 'graphql-request';

export interface SearchGitHubUser {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
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

export interface GetUser {
  user: {
    avatarUrl: string;
    bio: string;
    company: string;
    createdAt: string;
    databaseId: number;
    email: string;
    repositories: GetInfo<'name'>;
    followers: GetInfo<'login'>;
    following: GetInfo<'login'>;
    hasSponsorsListing: boolean;
    id: string;
    isBountyHunter: boolean;
    isCampusExpert: boolean;
    isDeveloperProgramMember: boolean;
    isEmployee: boolean;
    isHireable: boolean;
    isSiteAdmin: boolean;
    isSponsoringViewer: boolean;
    isViewer: boolean;
    location: string;
    login: string;
    name: string;
    updatedAt: string;
    twitterUsername: string;
    websiteUrl: string;
    gists: {
      totalCount: number;
    };
  };
  rateLimit: RateLimit;
}

type GetInfo<T extends string> = {
  nodes: { [key in T]: string }[];
  totalCount: number;
  pageInfo: PageInfo;
};

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor: string;
  startCursor: string;
}

interface RateLimit {
  remaining: number;
  resetAt: string;
  limit: number;
}

export const USER_PER_PAGE = 20;
const MAX_RETRY_TIME = 1;
const GITHUB_GQL_ENDPOINT = 'https://api.github.com/graphql';

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
  request: {
    retries: 1,
  },
});

export const searchUsers = async (
  username: string,
  page: number,
  pageSize = USER_PER_PAGE,
): Promise<SearchGitHubUser> => {
  const response = await octokit.search.users({
    q: `${username} in:login`,
    per_page: pageSize,
    page,
  });

  return response.data;
};

const client = new GraphQLClient(GITHUB_GQL_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
  },
});

export const getUser = async (
  username: string,
  count = 0,
): Promise<GetUser | null> => {
  if (count > MAX_RETRY_TIME) {
    return null;
  }

  const query = gql`
    query getUser($username: String!) {
      user(login: $username) {
        avatarUrl(size: 200)
        bio
        company
        createdAt
        databaseId
        email
        repositories(
          first: 100
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
          nodes {
            name
          }
          totalCount
          pageInfo {
            ...pageInfoFields
          }
        }
        followers(first: 100) {
          nodes {
            login
          }
          totalCount
          pageInfo {
            ...pageInfoFields
          }
        }
        following(first: 100) {
          nodes {
            login
          }
          totalCount
          pageInfo {
            ...pageInfoFields
          }
        }
        hasSponsorsListing
        id
        isBountyHunter
        isCampusExpert
        isDeveloperProgramMember
        isEmployee
        isHireable
        isSiteAdmin
        isSponsoringViewer
        isViewer
        location
        login
        name
        updatedAt
        twitterUsername
        websiteUrl
        gists {
          totalCount
        }
      }
      rateLimit {
        remaining
        resetAt
        limit
      }
    }

    fragment pageInfoFields on PageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  `;

  try {
    const data = await client.request<GetUser>(query, { username });
    return data;
  } catch (error) {
    console.error(error);

    // Retry once
    if (error instanceof ClientError && error.response.status !== 404) {
      return getUser(username, count + 1);
    }
    return null;
  }
};
