# Repository Guidelines

This project uses **Bun** for package management and testing.

## Setup

Run `bun install` at the repository root to install dependencies.

## Development Workflow

- **Tests**: execute `bun run test` to run the test suite. The command preloads `test/setup.ts`.
- **Linting**: execute `bun run lint` for lint checks.
- Husky hooks automatically run tests and lint-staged on commit.

Always ensure tests pass before committing changes.

## Issue Documentation

When encountering issues while inspecting or modifying code in this repository, please document them in this file following these guidelines:

1. **Issue Description**: Provide a clear, concise description of the issue
2. **Location**: Specify the exact file path(s) and line number(s) where the issue occurred
3. **Context**: Include relevant context (environment details, browser, tools used)
4. **Solution**: Document how you resolved the issue
5. **Prevention**: Explain how to avoid similar issues in the future

### Example Issue Documentation:

```
### Issue: Three.js component not rendering in tests

- **Location**: apps/web/__tests__/spinning-box.test.tsx (lines 12-24)
- **Context**: Running Jest tests with the standard setup
- **Problem**: The SpinningBox component uses WebGL features not available in JSDOM
- **Solution**: Added Canvas and WebGL polyfills in test/setup.ts
- **Prevention**: Any component using browser-specific APIs should have appropriate polyfills in test/setup.ts
```

Please keep this documentation organized by categories (UI components, API interactions, test environment, etc.) to make it easier to find relevant information.

**Note:** When you confirm that a documented issue has been permanently resolved (e.g., through updates to the codebase, dependencies, or tooling), please remove it from this file to keep the documentation current and focused on active issues.

### Known Issues

<!-- Add documented issues below this line following the example format -->
