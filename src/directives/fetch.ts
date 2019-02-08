import {SchemaDirectiveVisitor} from "graphql-tools";
import {GraphQLField} from "graphql";
import * as _path from "path";
import URLEx from "../URLEx";

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
