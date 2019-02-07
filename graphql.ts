import * as fs from 'fs';

require.extensions['.graphqls'] = function (module, filename) {
    const content = fs.readFileSync(filename).toString('utf-8');
    (module as any)._compile(`
    exports.default = ${JSON.stringify(content)}; // Здесь можно вызвать, например buildSchema и вернуть собранную схему.
  `, filename);
};
