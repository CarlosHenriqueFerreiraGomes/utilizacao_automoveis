/*
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testResultsProcessor: 'jest-bamboo-reporter'
};
*/
/** @type {import('ts-jest').JestConfigWithTsJest} */
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/*.ts'],
  testResultsProcessor: './node_modules/jest-bamboo-reporter',
  watchPathIgnorePatterns: ['<rootDir>/jest.json'],
  testEnvironment: 'node',
  collectCoverage: true,
  testTimeout: +process.env.TIMEOUT,
  testTimeout: 120000,
  testRegex: '\\.spec\\.(ts)$',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/middleware/',
    'src/types/',
    'src/server/',
    'src/exception/',
    'src/routes/',
    'src/settings/',
    'src/main.ts',
    'src/routes.ts'
  ],
  transformIgnorePatterns: ['/node_modules/.+\\.js$','/src/routes/.+\\.js$'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }

};
