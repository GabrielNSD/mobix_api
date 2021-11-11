module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@mobix_api/(.*)": "<rootDir>/src/$1",
  },
};
