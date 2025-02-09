module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',  
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],  
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/*.tsx',
    '!**/*.test.tsx',
    '!**/*.spec.tsx',
  ],
};
