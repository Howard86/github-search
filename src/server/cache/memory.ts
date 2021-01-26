import LRUCache, { Options } from 'lru-cache';
import { AbstractCache } from './model';

export default class MemoryCache<K, V> extends AbstractCache<K, V> {
  private readonly lruCache: LRUCache<K, V>;

  constructor(options: Options<K, V>) {
    super();
    this.lruCache = new LRUCache(options);
  }

  async get(key: K): Promise<V | undefined> {
    return this.lruCache.get(key);
  }

  async set(key: K, value: V): Promise<void> {
    this.lruCache.set(key, value);
  }
}
