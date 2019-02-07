import {SchemaDirectiveVisitor} from "graphql-tools";
import * as _path from "path";
import {GraphQLField} from "graphql";
import URLEx from "./URLEx";

export class RootDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<any, any>) {
        const {path} = this.args;

        field.resolve = (source: any, args: any, context) => {
            context.API_KEY = args.key;
            context.rootPath = path;
            return {
                currentPath: []
            };
        };
    }
}

export class FetchDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<any, any>) {
        const {path} = this.args;

        field.resolve = (source: any, args: any, context) => {
            source.currentPath.push(path);
            let url = _path.join(...source.currentPath).replace(/\\/g, '/');


            return URLEx.fetch(context, url, args);
        };
    }
}

export class PassNextDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: any) {
        let path: string = this.args.path;
        field.resolve = (source: any, args: any) => {
            path = path.replace(/:(\w+)/g, (match: string, argName: string) => args[argName]);

            return {
                currentPath: [...source.currentPath, path],
            };
        };
    }
}
