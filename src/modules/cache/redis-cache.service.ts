
import { ICache } from "./redis-cache.interface";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from "@nestjs/common";
export class RedisCacheService implements ICache{
    
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {
    }

    async set(key: string, value: any,ttl?: number): Promise<{ status: boolean; message?: string; }> {
        try {
            const redisData = await this.cacheManager.set(key,value,ttl)
            return {
                status:true,
                message:'success',
            }
        } catch (e) {
            return {
                status:false,
                message:'failed',
            }
        }
    }
    async get(key: string): Promise<{ status: boolean; message?: string; data?:any}> {
        try {
            const redisData = await this.cacheManager.get(key)
            return {
                status:true,
                message:'success',
                data:redisData
            }
        } catch (e) {
            return {
                status:false,
                message:'failed',
            }
        }
    }
    async delete(key: string): Promise<{ status: boolean; message?: string; }> {
        try {
            const redisData = await this.cacheManager.del(key)
            return {
                status:true,
                message:'success',
            }
        } catch (e) {
            return {
                status:false,
                message:'failed',
            }
        }
    }

}