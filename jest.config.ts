import type { Config } from 'jest'

const config: Config = {
  moduleNameMapper: {
    '^@/packages/(.*)$': '<rootDir>/packages/$1',
    '^@/(.*)$': '<rootDir>/apps/web/$1',
    '^@/app/(.*)$': '<rootDir>/apps/web/app/$1'
  },
  preset: 'ts-jest',
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }]
  }
}

export default config
