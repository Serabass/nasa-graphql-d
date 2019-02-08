import {SchemaDirectiveVisitor} from "graphql-tools";
import {GraphQLField} from "graphql";
import {Context, Source} from "../interfaces";

export class PassNextDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<Source, Context>) {
        let path: string = this.args.path;
        field.resolve = (source: Source, args: any): Source => {
            path = path.replace(/:(\w+)/g, (match: string, argName: string) => args[argName]);

            console.log(path);

            return {
                currentPath: [...source.currentPath, path],
            };
        };
    }
}
