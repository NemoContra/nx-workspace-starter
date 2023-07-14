const nxPreset = require('@nx/jest/preset').default;
module.exports = {
  ...nxPreset,
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  testTimeout: 10000,
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  resolver: '@nx/jest/plugins/resolver',
  maxConcurrency: 4,
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageReporters: ['html'],
  testEnvironment: 'node',
  setupFiles: ['jest-date-mock'],
};
