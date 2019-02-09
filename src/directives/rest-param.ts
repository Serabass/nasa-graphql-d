import {SchemaDirectiveVisitor} from "graphql-tools";
import {GraphQLArgument, GraphQLField, GraphQLInterfaceType, GraphQLObjectType} from "graphql";
import "reflect-metadata";

export class RestParamDirective extends SchemaDirectiveVisitor {
    public visitArgumentDefinition(argument: GraphQLArgument, details: {
        field: GraphQLField<any, any>;
        objectType: GraphQLObjectType | GraphQLInterfaceType;
    }): GraphQLArgument | void | null {
        let restParams: GraphQLArgument[] = Reflect.getMetadata('schema:restParams', details.field);

        if (!restParams) {
            restParams = [];
        }

        restParams.push(argument);

        Reflect.defineMetadata('schema:restParams', restParams, details.field);
    }
}
