import {SchemaDirectiveVisitor} from 'graphql-tools';
import {GraphQLField} from "graphql";
import * as _path from "path";
import fetch from "../fetch";
import {Context, FetchArgs, Source} from "../interfaces";

export class FetchDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<Source, Context, FetchArgs>) {
        const {path} = (this as any).args; // TODO fix

        field.resolve = (source: Source, args: FetchArgs, context: Context): any => {
            source.currentPath.push(path);
            let url = _path.join(...source.currentPath).replace(/\\/g, '/');

            // console.log(url);

            return fetch(context, url, args);
        };
    }
}
