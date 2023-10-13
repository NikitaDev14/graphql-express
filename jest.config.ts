import { Config } from 'jest';

const config: Config = {
	transform: { '^.+\\.ts?$': 'ts-jest' },
	testEnvironment: 'node',
	testMatch: ['<rootDir>/tests/**/*.spec.ts'],
	moduleFileExtensions: ['ts', 'js'],
	verbose: true,
	coverageReporters: ["lcov", "text-summary", "json-summary"],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
};

export default config;