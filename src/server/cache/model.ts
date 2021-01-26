export type Option<T> = T | undefined;

export interface Cache<K, V> {
  get(key: K): Promise<Option<V>>;
  getOrInsert(key: K, produceValue: () => Promise<V>): Promise<V>;
  set(key: K, value: V): Promise<void>;
  mget(keys: readonly K[]): Promise<Array<Option<V>>>;
  mset(keyValuePairs: [K, V][]): Promise<void>;
}

export abstract class AbstractCache<K, V> implements Cache<K, V> {
  abstract get(key: K): Promise<Option<V>>;
  abstract set(key: K, value: V): Promise<void>;

  async getOrInsert(key: K, produceValue: () => Promise<V>): Promise<V> {
    let value = await this.get(key);
    if (value === undefined) {
      value = await produceValue();
      this.set(key, value).catch((error) =>
        console.error(`Error setting ${key} = ${value}: ${error}`),
      );
    }
    return value;
  }

  async mget(keys: readonly K[]): Promise<Option<V>[]> {
    return Promise.all(keys.map((key) => this.get(key)));
  }

  async mset(kvs: [K, V][]): Promise<void> {
    await Promise.all(kvs.map(([k, v]) => this.set(k, v)));
  }
}
