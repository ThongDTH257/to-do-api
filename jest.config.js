/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest", // Use ts-jest for TypeScript support
    testEnvironment: "node", // Simulate a Node.js environment
    testMatch: ["**/tests/**/*.test.ts"], // Look for test files in the "tests" folder
    verbose: true, // Show detailed test results
    forceExit: true, // Force Jest to exit after tests finish
    clearMocks: true, // Automatically clear mock calls and instances
    transform: {
      "^.+\\.ts?$": "ts-jest", // Transform TypeScript files using ts-jest
    },
    moduleFileExtensions: ["ts", "js", "json"], // Recognize .ts and .js files
  };
  