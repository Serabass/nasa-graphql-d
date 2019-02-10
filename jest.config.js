module.exports = {
    roots: ["<rootDir>/"],
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json",
            isolatedModules: true,
            diagnostics: false
        }
    },
    moduleFileExtensions: ["ts", "js"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "**/*-test.ts",
    ],
    testEnvironment: "node",
};
