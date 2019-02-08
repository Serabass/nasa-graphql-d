import {ApolloServer, gql, makeExecutableSchema} from "apollo-server";
import {FetchDirective, PassNextDirective, RootDirective} from "./directives";
import {importSchema} from "graphql-import";
import Env from "./env";

const typeDefs = importSchema('schema/index.graphql');
const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
        Query: {
            debug: () => (global as any).debug
        },

        Debug: {
            rateLimit: (source) => source.rateLimit,
            rateLimitRemaining: (source) => source.rateLimitRemaining,
            lastUrl: (source) => source.lastUrl,
        },

        // Type field resolver example
        PhotosResponse2: {
            urls: (source) => source.photos.map((photo: any) => photo.img_src),
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

console.log(Env);

server.listen().then(({url}: any) => {
    console.log(`🚀  Server ready at ${url}`);
});
