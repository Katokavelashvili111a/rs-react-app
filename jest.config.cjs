module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],  
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/*.tsx',
    '!**/*.test.tsx',
    '!**/*.spec.tsx',
  ],
};
