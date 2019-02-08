import {SchemaDirectiveVisitor} from "graphql-tools";
import {GraphQLField} from "graphql";
import * as _path from "path";
import fetch from "../fetch";

export class FetchDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<any, any>) {
        const {path} = this.args;

        field.resolve = (source: any, args: any, context) => {
            source.currentPath.push(path);
            let url = _path.join(...source.currentPath).replace(/\\/g, '/');

            console.log(url);

            return fetch(context, url, args);
        };
    }
}
