import AppCache from '../persistence/cache';
import type { SearchGitHubUser, GetUser } from '../model/github';
import type { SearchUserPage, User } from '../model/user';
import GithubService from './github';

export default class UserService {
  constructor(
    private readonly githubService: GithubService,
    private readonly cache: AppCache,
  ) {}

  public async searchUsersByUsername(
    username: string,
    page: number,
  ): Promise<SearchUserPage> {
    return this.cache
      .getSearchUserPageCache()
      .getOrInsert(this.constructKey(username, page), async () => {
        const result = await this.githubService.searchUsers(username, page);
        return this.convertUserPage(result, page);
      });
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    return this.cache.getUserCache().getOrInsert(username, async () => {
      const result = await this.githubService.getUser(username);
      return this.convertUser(result);
    });
  }

  private constructKey(...args: (string | number)[]): string {
    return args.join('::');
  }

  private convertUserPage(raw: SearchGitHubUser, page: number): SearchUserPage {
    const total = raw.total_count;
    return {
      total,
      isStart: page === 1,
      page,
      totalPage: Math.floor(total / this.githubService.USER_PER_PAGE) + 1,
      isEnd: page * this.githubService.USER_PER_PAGE >= total,
      users: raw.items.map((item) => ({
        avatarUrl: item.avatar_url,
        username: item.login,
      })),
    };
  }

  private convertUser(raw: GetUser): User {
    if (!raw) {
      return null;
    }

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
    } = raw.user;

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
          data: repositories.nodes.map(this.mapRepository),
        },
        followers: {
          total: followers.totalCount,
          data: followers.nodes.map(this.mapFollow),
        },
        following: {
          total: following.totalCount,
          data: following.nodes.map(this.mapFollow),
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

  private mapFollow(user: { login: string }): string {
    return user.login;
  }

  private mapRepository(repository: { name: string }): string {
    return repository.name;
  }
}
