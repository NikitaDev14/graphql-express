import type { Config } from 'jest';

const config: Config = {
  cache: false,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  coverageProvider: 'v8',
  resetMocks: true,
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};

export default config;
