import AppCache from '../persistence/cache';
import GitHubService from './github';
import UserService from './user';

// in seconds
const TEN_MINUTES = 10 * 60;

const cache = new AppCache(process.env.ENABLE_REDIS === 'true', TEN_MINUTES);
const githubService = new GitHubService(process.env.GITHUB_ACCESS_TOKEN);
const userService = new UserService(githubService, cache);

export default userService;
