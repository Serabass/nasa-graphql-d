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
        let response = await fetch(url);
        let limit: string = response.headers.get("x-ratelimit-limit") as string;
        let remaining: string = response.headers.get("x-ratelimit-remaining") as string;

        let json = await response.json();
        (global as any).rateLimit = parseInt(limit, 10);
        (global as any).rateLimitRemaining = parseInt(remaining, 10);
        return json as T;
    }
}
