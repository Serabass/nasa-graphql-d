import {SchemaDirectiveVisitor} from "graphql-tools";

export class PassNextDirective extends SchemaDirectiveVisitor {
    public visitFieldDefinition(field: any) {
        let path: string = this.args.path;
        field.resolve = (source: any, args: any) => {
            path = path.replace(/:(\w+)/g, (match: string, argName: string) => args[argName]);

            console.log(path);

            return {
                currentPath: [...source.currentPath, path],
            };
        };
    }
}
