// jest.config.ts
import type { Config } from 'jest';
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@/src/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(config);
