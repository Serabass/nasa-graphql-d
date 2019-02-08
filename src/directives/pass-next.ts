import {SchemaDirectiveVisitor} from "graphql-tools";
import {GraphQLField} from "graphql";
import {Context, Source} from "../interfaces";

export class PassNextDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: GraphQLField<Source, Context>) {
        let path: string = this.args.path;
        let restParams = Reflect.getMetadata('schema:restParams', field);
        if (restParams) {
            debugger;
        }
        field.resolve = (source: Source, args: any): Source => {
            path = path.replace(/:(\w+)/g, (match: string, argName: string) => args[argName]);

            return {
                currentPath: [...source.currentPath, path],
            };
        };
    }
}
