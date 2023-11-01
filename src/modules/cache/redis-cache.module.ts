import { Module, } from "@nestjs/common";
import { RedisCacheService } from "./redis-cache.service";
import { CacheModule,CacheStore } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService ,} from '@nestjs/config'
import { redisStore } from 'cache-manager-redis-store';
@Module({
    imports: [
      CacheModule.registerAsync({
        isGlobal: true,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          isGlobal: true,
          store: (await redisStore({
            url: process.env.REDIS_URL,
            ttl:300
          })) as unknown as CacheStore,
        }),
        inject: [ConfigService],
      }),
    ],
    controllers:[
    ],
    providers:[
        RedisCacheService
    ],
})

export class RedisCacheModule{

}