import {URL} from "url";
import fetch from "node-fetch";

export default class URLEx extends URL {
    public static async fetch<T = any>(ctx: any, pathname: any, args: any): Promise<T> {
        let urlEx = new URLEx(ctx.rootPath);
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
        console.log(url);
        let response = await fetch(url);
        let limit: string = response.headers.get("x-ratelimit-limit") as string;
        let remaining: string = response.headers.get("x-ratelimit-remaining") as string;

        let json = await response.json();

        if (!(global as any).debug) {
            (global as any).debug = {};
        }

        (global as any).debug.rateLimit = parseInt(limit, 10);
        (global as any).debug.rateLimitRemaining = parseInt(remaining, 10);
        (global as any).debug.lastUrl = url;
        return json as T;
    }
}
