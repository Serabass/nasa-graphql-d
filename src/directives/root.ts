import {SchemaDirectiveVisitor} from "graphql-tools";
import {GraphQLField} from "graphql";

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
