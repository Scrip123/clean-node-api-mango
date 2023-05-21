export default {
  collectCoverage: true,
  // coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.spec.ts'],
  testEnvironment: 'jest-environment-node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  // jest configuratio to support @modules
  moduleNameMapper: {
    '@presentation/(.*)': '<rootDir>/src/presentation/$1'
  }
}
