import {importSchema} from "graphql-import";

setInterval(() => {}, 1000);

try {
    importSchema('schema/index.graphql');
    console.info('Schema is valid');
} catch (e) {
    console.error(e.message);
}
