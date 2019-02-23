import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import Redis from 'ioredis';
import { redisUri } from '../core/core.module';

export const REDIS_CLIENT = 'REDIS_CLIENT' as const;

@Injectable()
export class RedisService {
  private redisClient = new Redis({
    host: new URL(redisUri).hostname,
    port: +new URL(redisUri).port,
  });

  public async get<T = object>(key: string): Promise<T> {
    return promisify(this.redisClient.get.bind(this.redisClient))(key).then(
      JSON.parse
    );
  }

  public async set(
    key: string,
    value: any,
    expireTime: number = 0
  ): Promise<number> {
    return promisify(this.redisClient.set.bind(this.redisClient))(
      key,
      JSON.stringify(value),
      'EX',
      expireTime
    );
  }

  public async delete(key: string): Promise<number> {
    return promisify(this.redisClient.del.bind(this.redisClient))(key);
  }
}
