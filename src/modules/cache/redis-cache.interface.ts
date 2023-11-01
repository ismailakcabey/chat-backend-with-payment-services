
export interface ICache{
    set(key: string, value:any,ttl?:number):Promise<{
        status:boolean
        message?:string
    }>
    get(key: string):Promise<{
        status:boolean
        message?:string
        data?:any
    }>
    delete(key: string):Promise<{
        status:boolean
        message?:string
    }>
}