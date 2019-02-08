import {SchemaDirectiveVisitor} from "graphql-tools";
import {GraphQLField} from "graphql";
import {Context, Source} from "../interfaces";

export class RootDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<Source, Context>) {
        const {path} = this.args;

        field.resolve = (source, args, context): Source => {
            context.API_KEY = args.key;
            context.rootPath = path;
            return {
                currentPath: []
            };
        };
    }
}
