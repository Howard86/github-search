import { createClient, RedisClient } from 'redis';
import { MemoryCache, RedisCache, Cache } from '../cache';
import type { User, SearchUserPage } from '../model/user';

export default class AppCache {
  private readonly searchUserPageCache: Cache<string, SearchUserPage>;
  private readonly userCache: Cache<string, User>;

  constructor(enableRedis: boolean, ttl: number) {
    if (enableRedis) {
      const client = createClient();
      this.searchUserPageCache = this.initializeRedis(client, 'search', ttl);
      this.userCache = this.initializeRedis(client, 'get', ttl);
    } else {
      this.searchUserPageCache = this.initializeMemory(100, ttl);
      this.userCache = this.initializeMemory(1000, ttl);
    }
  }

  public getSearchUserPageCache(): Cache<string, SearchUserPage> {
    return this.searchUserPageCache;
  }

  public getUserCache(): Cache<string, User> {
    return this.userCache;
  }

  private initializeRedis<V>(
    client: RedisClient,
    prefix: string,
    ttl: number,
  ): RedisCache<string, V> {
    return new RedisCache<string, V>(
      client,
      (_) => `${prefix}::${_}`,
      JSON.stringify,
      JSON.parse,
      // seconds
      ttl,
    );
  }

  private initializeMemory<V>(
    max: number,
    ttl: number,
  ): MemoryCache<string, V> {
    // mini-seconds
    return new MemoryCache({ maxAge: ttl * 1000, max });
  }
}
