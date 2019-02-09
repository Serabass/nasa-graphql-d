
export interface Source {
    currentPath: string[];
}

export interface Context {
    API_KEY: string;
    rootPath: string;
}

export interface FetchArgs {
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS";
}
