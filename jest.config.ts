import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    collectCoverage: true,
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '\\.*.test.(ts|js)x?',
};

export default config;
