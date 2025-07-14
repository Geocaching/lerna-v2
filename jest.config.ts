import type { Config } from 'jest'

const config: Config = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/apps/web/$1',
    '^@/app/(.*)$': '<rootDir>/apps/web/app/$1',
    '^@geocaching/glb-model$': '<rootDir>/packages/glb-model/src'
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
