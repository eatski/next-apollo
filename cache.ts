import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

import { open, readFile,stat, writeFile } from "fs/promises";
export const doAccess = async <T>(fn: (client: ApolloClient<NormalizedCacheObject>) => Promise<T>) : Promise<T> => {
    const cache = new InMemoryCache();
    const file = "./.cache/data.json";
    const st = await stat(file).catch(() => {});
    if(st){
        const json = await readFile(file);
        const data = JSON.parse(json.toString())
        cache.restore(data);
    } else {
        open(file,"w")
    }
    const client = new ApolloClient({
        uri: 'http://localhost:4000',
        cache
    });
    const res = await fn(client);
    writeFile(file,JSON.stringify(cache.extract())); 
    return res
}