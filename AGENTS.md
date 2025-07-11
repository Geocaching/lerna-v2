# Repository Guidelines

This project uses **Bun** for package management and testing.

## Setup

Run `bun install` at the repository root to install dependencies.

## Development Workflow

- **Tests**: execute `bun run test` to run the test suite. The command preloads `test/setup.ts`.
- **Linting**: execute `bun run lint` for lint checks.
- Husky hooks automatically run tests and lint-staged on commit.

Always ensure tests pass before committing changes.
