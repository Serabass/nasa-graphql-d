import * as fs from "fs-extra";
import {ApolloServer, gql, makeExecutableSchema} from "apollo-server";
import {FetchDirective, PassNextDirective, RootDirective} from "./directives";

const typeDefs = gql(fs.readFileSync('./schema.graphqls').toString('utf-8'));
const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query: {
            rateLimit: () => (global as any).rateLimit,
            rateLimitRemaining: () => (global as any).rateLimitRemaining,
        }
    },
    schemaDirectives: {
        Fetch: FetchDirective,
        PassNext: PassNextDirective,
        Root: RootDirective,
    }
});

const server = new ApolloServer({
    schema,
    rootValue: {
        currentPath: [],
    },
    context: ({req}: any) => {
        return {req};
    }
});

server.listen().then(({url}: any) => {
    console.log(`🚀  Server ready at ${url}`);
});
