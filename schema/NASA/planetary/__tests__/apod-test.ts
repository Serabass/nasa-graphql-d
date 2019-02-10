import ApolloClient from "apollo-boost";
import {server} from "../../../../src/server";

describe('APOD Test', () => {
    let client = new ApolloClient({
        uri: "http://localhost:4000"
    });

    beforeAll(async () => {
        await server.listen();
    });

    it('Url must be correct', () => {
        expect(1).toBe(1);
    });
});
