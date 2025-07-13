module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }]
  },
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/apps/web/app/$1',
    '^@/(.*)$': '<rootDir>/apps/web/$1',
    '^@geocaching/glb-model$': '<rootDir>/packages/glb-model/src'
  }
}
