# @geocaching/lerna-v2-utils

Utility functions used across the monorepo.

This package also contains a base Rollup configuration that other packages can
extend. The TypeScript types for the configuration are exported as well.

## Installation

```bash
npm install @geocaching/lerna-v2-utils
# or
bun add @geocaching/lerna-v2-utils
```

## Usage

```ts
import { greet } from '@geocaching/lerna-v2-utils'

console.log(greet('World')) // "Hello, World!"
```

### Rollup configuration

```ts
import baseConfig, { RollupConfig } from '@geocaching/lerna-v2-utils/rollup.config'

const config: RollupConfig = {
  ...baseConfig,
  input: 'src/index.ts',
}

export default config
```

Feel free to add additional utilities to this package as the project grows.
