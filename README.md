# core-features

Tells you whether a given feature is supported in a given version of Node.js,
for versions of Node.js that are on active or maintenance release lines.

## Usage

This module exports a function `supports(feature[, version])`. If version is
omitted, then `process.versions.node` is used. Any semver-valid version number
may be used, but only versions corresponding to actively maintained release
lines are supported. Versions outside those ranges may result in incorrect
output. The `feature` argument is a `.`-separated path that uniquely identifies
a feature of Node.js.

> Note: Not all features of Node.js are included, but going forward, all
> semver-minor feature additions and semver-major feature removals are expected
> to be reflected in data.yml. Please see the `data.yml` or use the `list`
> property to see what's supported.

In the event that data is missing for a feature, `supports` will return
`undefined`, rather than a boolean.

The full list of available features to check support for is given as the
exported `list` property.

### Examples

```js
const { supports, list } = require('core-features');

console.log(list);
// [ 'fs',
//   'fs.mkdir',
//   'fs.mkdir.recursive',
//   ... ]

console.log(supports('fs.mkdir.recursive', '10.8.0')); // false
console.log(supports('fs.mkdir.recursive', '10.8.0')); // false
console.log(supports('fs.mkdir.recursive', '10.9.0')); // true

console.log(supports('fs.mkdir.recursive')); // false (on Node v10.8.0)
console.log(supports('fs.mkdir.recursive')); // true (on Node v10.9.0)

console.log(supportS('fs.mkdir'); // true
console.log(supportS('fs'); // true
```

## Contributing

See `CONTRIBUTING.md`.

## License

MIT License. See `LICENSE`.
