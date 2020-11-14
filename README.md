[![Travis](https://travis-ci.com/Shopify/rollup-plugin-remap.svg?branch=master)](https://travis-ci.com/Shopify/rollup-plugin-remap)

rollup-plugin-remap
===

Plugin to remap imported modules to other file paths. Useful for conditional
compilation, ie: remapping development focused modules to a `noop` during a
production build.

# Examples

In this example, we're remapping a logger module to a noop module during a
production build of a project.

__rollup.config.js__
```js
const plugins = [];

if (process.env.BUILD_MODE === 'production') {
  plugins.push(remap({
    originalPath: 'src/logger.js',
    targetPath: 'src/noop.js'
  }));
}

export default {
  entry: 'src/someModule.js',
  plugins
}
```

Would remap the following import to a file called `src/noop.js`.

__src/someModule.js__
```js
import logger from './logger';

export default function doStuff() {
  // ...
  // do some stuff
  // ...

  logger('I did some stuff');
}
```
