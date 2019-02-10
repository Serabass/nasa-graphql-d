import ApolloClient, {gql} from "apollo-boost";
import {server} from "../../src/server";
import fetch from "node-fetch";

describe('Url Building Tests', () => {
    let client: ApolloClient<any>;

    beforeAll(async () => {
        await server.listen();
        // await server.listen();
        client = new ApolloClient({
            uri: "http://localhost:4000",
            fetch
        } as any);
    });

    async function q(query: string, variables: any = {}) {
        return await client.query<any>(
            {
                query: gql(query),
                variables
            }
        );
    }

    it('Url must be correct', async() => {
        let result = await q(`query { NASA(key: "DEMO_KEY") { planetary { apod { url } } } }`);
        expect(result).toBeDefined();
        expect(result.data.NASA.planetary.apod.url)
            .toBe("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
    });

    it('Url must be correct 2', async() => {
        let result = await q(`query { NASAImages { search(q: "query") { url } } }`);
        expect(result).toBeDefined();
        expect(result.data.NASAImages.search.url)
            .toBe("https://images-api.nasa.gov/search?q=query");
    });

    it('Url must be correct 3', async() => {
        let result = await q(`query { Exoplanets { nsted { nph(where: "pl_kepflag=1", table: exoplanets) { url } } } }`);
        expect(result).toBeDefined();
        expect(result.data.Exoplanets.nsted.nph.url)
            .toBe("https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&where=pl_kepflag%3D1&format=json");
    });

    it('Url must be correct 3 (rest)', async() => {
        let result = await q(`query { NASA { marsPhotos { rovers(version: "v1") { photos(sol: 1000, roverName: curiosity) { url } } } } }`);
        expect(result).toBeDefined();
        expect(result.data.NASA.marsPhotos.rovers.photos.url)
            .toBe("https://api.nasa.gov/mars-photos/api/v1/rovers/photos?api_key=DEMO_KEY&sol=1000&roverName=curiosity");
    });

    it('Url must be correct 3 (rest, with variables)', async() => {
        let result = await q(`query($version: String!, $sol: Int!) { NASA { marsPhotos { rovers(version: $version) { photos(sol: $sol, roverName: curiosity) { url } } } } }`, {
            version: 'v1',
            sol: 1000
        });
        expect(result).toBeDefined();
        expect(result.data.NASA.marsPhotos.rovers.photos.url)
            .toBe("https://api.nasa.gov/mars-photos/api/v1/rovers/photos?api_key=DEMO_KEY&sol=1000&roverName=curiosity");
    });

    it('Url must be correct 4', async() => {
        let result = await q(`query { GeneLab { search(term: "1") { url } } }`);
        expect(result).toBeDefined();
        expect(result.data.GeneLab.search.url)
            .toBe("https://genelab-data.ndc.nasa.gov/genelab/data/search?term=1&from=0&size=25");
    });

    afterAll(async () => {
        await server.stop();
    });
});
