import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';
import { RedisClient } from '@nestjs/microservices/external/redis.interface';
import { Subject } from 'rxjs';
import { promisify } from 'util';

@Injectable()
export class RedisService implements OnModuleInit {
  private redisClient: RedisClient;
  private redisErrorSubject: Subject<Error>;

  constructor(@Inject('REDIS') private readonly connection: ClientRedis) {
  }

  onModuleInit() {
    this.redisErrorSubject = new Subject();
    this.redisClient = this.connection.createClient(this.redisErrorSubject);
  }

  public async get<T = object>(key: string): Promise<T> {
    return promisify(this.redisClient.get.bind(this.redisClient))(key).then(JSON.parse);
  }

  public async set(key: string, value: any, expireTime: number = 0): Promise<number> {
    return promisify(this.redisClient.set.bind(this.redisClient))(key, JSON.stringify(value), 'EX', expireTime);
  }

  public async delete(key: string): Promise<number> {
    return promisify(this.redisClient.del.bind(this.redisClient))(key);
  }
}
