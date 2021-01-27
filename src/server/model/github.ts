import { gql } from 'graphql-request';

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

export const getUserQuery = gql`
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
