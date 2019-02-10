import {SchemaDirectiveVisitor} from 'graphql-tools';
import {GraphQLField} from "graphql";
import * as _path from "path";
import fetch from "../fetch";
import {Context, FetchArgs, Source} from "../interfaces";
import {URL} from "url";

export class FetchDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<Source, Context, FetchArgs>) {
        const {path} = (this as any).args; // TODO fix

        field.resolve = (source: Source, args: FetchArgs, context: Context): any => {
            source.currentPath.push(path);
            let url = _path.join(...source.currentPath).replace(/\\/g, '/');

            let urlEx = new URL(context.rootPath);
            urlEx.pathname = url;

            if (context.API_KEY) {
                urlEx.searchParams.append("api_key", context.API_KEY);
            }

            if (args) {
                Object.keys(args)
                    .forEach((key: string) => {
                        urlEx.searchParams.append(key, args[key as keyof FetchArgs]);
                    });
            }

            // console.log(url);

            return {
                url: urlEx.toString(),
                result: () => fetch(urlEx)
            };
        };
    }
}
