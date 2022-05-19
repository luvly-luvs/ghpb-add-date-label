module.exports = {
  clearMocks: true,
  setupFiles: ['<rootDir>/.jest/env.js'],
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  verbose: true,
};
