import type { RedisClient } from 'redis';
import { promisify } from 'util';
import { AbstractCache, Option } from './model';

export default class RedisCache<K, V> extends AbstractCache<K, V> {
  constructor(
    private readonly client: RedisClient,
    private readonly serializeKey: (_: K) => string,
    private readonly serializeValue: (_: V) => string,
    private readonly deserializeValue: (_: string) => V,
    private readonly ttl: number,
  ) {
    super();
  }

  private readonly getAsync = promisify(this.client.get).bind(this.client);
  private readonly mgetAsync = promisify(this.client.mget).bind(this.client);
  private readonly setAsync = promisify(this.client.setex).bind(this.client);
  private readonly msetAsync = promisify(this.client.mset).bind(this.client);

  private processGetResult(v: string | null): Option<V> {
    if (v === null) {
      return;
    }
    return this.deserializeValue(v);
  }

  async get(key: K): Promise<V | undefined> {
    return this.processGetResult(await this.getAsync(this.serializeKey(key)));
  }

  async set(key: K, value: V): Promise<void> {
    await this.setAsync(
      this.serializeKey(key),
      this.ttl,
      this.serializeValue(value),
    );
  }

  async mget(keys: ReadonlyArray<K>): Promise<Array<Option<V>>> {
    const values: Array<string | null> = await this.mgetAsync(
      keys.map((key) => this.serializeKey(key)),
    );
    return values.map((v) => this.processGetResult(v));
  }

  async mset(kvs: [K, V][]): Promise<void> {
    await this.msetAsync(
      ...kvs
        .map(([key, value]) => [
          this.serializeKey(key),
          this.serializeValue(value),
        ])
        .flat(1),
    );
  }
}
