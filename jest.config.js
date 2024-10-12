/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$", // ใช้ testRegex แทน testMatch
  moduleDirectories: ["node_modules", "src"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
};
