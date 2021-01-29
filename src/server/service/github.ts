import { Octokit } from '@octokit/rest';
import { retry } from '@octokit/plugin-retry';
import { throttling } from '@octokit/plugin-throttling';
import { ClientError, GraphQLClient } from 'graphql-request';
import { GetUser, getUserQuery, SearchGitHubUser } from '../model/github';

export default class GithubService {
  private octokit: Octokit;
  private client: GraphQLClient;

  private readonly GITHUB_GQL_ENDPOINT = 'https://api.github.com/graphql';
  private readonly MAX_RETRY_TIME = 1;
  public readonly USER_PER_PAGE = 20;

  constructor(githubAccessToken: string) {
    this.initializeOctokit(githubAccessToken);
    this.initializeGraphqlClient(githubAccessToken);
  }

  public async searchUsers(
    username: string,
    page: number,
    pageSize = this.USER_PER_PAGE,
  ): Promise<SearchGitHubUser> {
    const response = await this.octokit.search.users({
      q: `${username} in:login`,
      per_page: pageSize,
      page,
    });

    return response.data;
  }

  public async getUser(username: string, count = 0): Promise<GetUser | null> {
    if (count > this.MAX_RETRY_TIME) {
      return null;
    }

    try {
      const data = await this.client.request<GetUser>(getUserQuery, {
        username,
      });
      return data;
    } catch (error) {
      console.error(error);
      const isUnexpectedError =
        error.response.status >= 400 && error.response.status !== 404;
      // Retry once
      if (error instanceof ClientError && isUnexpectedError) {
        return this.getUser(username, count + 1);
      }
    }
    return null;
  }

  private initializeGraphqlClient(token: string): void {
    this.client = new GraphQLClient(this.GITHUB_GQL_ENDPOINT, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  private initializeOctokit(auth: string): void {
    const EnhancedOctokit = Octokit.plugin(retry, throttling);
    this.octokit = new EnhancedOctokit({
      auth,
      throttle: {
        onRateLimit: (retryAfter, options) => {
          this.octokit.log.warn(
            `Request quota exhausted for request ${options.method} ${options.url}`,
          );

          if (options.request.retryCount === 0) {
            // only retries once
            this.octokit.log.info(`Retrying after ${retryAfter} seconds!`);
            return true;
          }
        },
        onAbuseLimit: (_, options) => {
          // does not retry, only logs a warning
          this.octokit.log.warn(
            `Abuse detected for request ${options.method} ${options.url}`,
          );
        },
      },
      request: {
        retries: 1,
      },
    });
  }
}
