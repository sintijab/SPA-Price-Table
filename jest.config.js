module.exports = {
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['js/**/**/*.{js,jsx,mjs}'],
  coverageReporters: ["json", "html"],
  coverageDirectory: 'tests/coverage',
  snapshotSerializers: [
      "enzyme-to-json/serializer"
  ],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/node_modules/jest-css-modules"
,
  },
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30
    },
    "./js/components/": {
      branches: 40,
      statements: 40
    },
    "./js/templates/": {
      branches: 40,
      statements: 40
    },
    "./js/actions/": {
      branches: 70,
      statements: 70
    },
    "./js/reducers/": {
      branches: 60,
      statements: 60
    },
    "./js/constants/": {
      statements: 70
    }
  }
};
