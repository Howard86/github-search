import { Octokit } from '@octokit/core';

export interface GitHubUser {
  username: string;
  avatarUrl: string;
}

// only needs the following field
interface GitHubRawUser {
  login: string;
  avatar_url: string;
}

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

const filterUnusedData = (raw: GitHubRawUser): GitHubUser => ({
  username: raw.login,
  avatarUrl: raw.avatar_url,
});

export const searchUsersByUsername = async (
  username: string,
): Promise<GitHubUser[]> => {
  const response = await octokit.request('GET /search/users', {
    q: `${username} in:name`,
  });
  return response.data.items.map(filterUnusedData);
};

export const getUserByUsername = async (
  username: string,
): Promise<GitHubUser | null> => {
  const response = await octokit.request('GET /users/{username}', { username });
  return response.status === 200 ? filterUnusedData(response.data) : null;
};
