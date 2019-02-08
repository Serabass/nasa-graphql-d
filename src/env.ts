import {EnvValue, env} from "./decorators/env-value";

@env
export default class Env {
    [key: string]: string | undefined;

    @EnvValue() public static APP_SECRET: string;
    @EnvValue() public static PORT: number;
    @EnvValue() public static MONGODB_URI: string;
    @EnvValue() public static VK_TOKEN: string;
    @EnvValue() public static SHOW_HIDDEN_RESOLVERS: boolean;
}
