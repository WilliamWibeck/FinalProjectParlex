/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom", // For React components
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^firebase/(.*)$": "<rootDir>/src/__mocks__/firebase/$1", // Redirect Firebase imports to mocks
  },
};
