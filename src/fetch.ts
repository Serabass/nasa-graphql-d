import {URL} from "url";
import nodeFetch from "node-fetch";

export default async function fetch<T = any>(urlEx: URL): Promise<T> {
    let url = urlEx.toString();
    // console.log(url);
    let response = await nodeFetch(url);
    let limit: string = response.headers.get("x-ratelimit-limit") as string;
    let remaining: string = response.headers.get("x-ratelimit-remaining") as string;

    let json = await response.json();

    (global as any).debug = {
        rateLimit: parseInt(limit, 10),
        rateLimitRemaining: parseInt(remaining, 10),
        lastUrl: url,
    };

    debugger;
    return json as T;
}
