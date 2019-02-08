import {URL} from "url";
import nodeFetch from "node-fetch";
import {Context} from "./interfaces";

export default async function fetch<T = any>(ctx: Context, pathname: string, args: any): Promise<T> {
    let urlEx = new URL(ctx.rootPath);
    urlEx.pathname = pathname;

    if (ctx.API_KEY) {
        urlEx.searchParams.append("api_key", ctx.API_KEY);
    }

    if (args) {
        Object.keys(args)
            .forEach((key) => {
                urlEx.searchParams.append(key, args[key]);
            });
    }

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

    return json as T;
}
