module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text-summary', 'html'],
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'json', 'js'],
  testRegex: '(/__test__/.*\\.test\\.ts$)|(\\.test\\.ts$)',
  transform: { '.ts': 'ts-jest' },
  clearMocks: true
};