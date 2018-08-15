'use strict';

const assert = require('assert');
const { supports, list } = require('./index.js');

assert(Array.isArray(list));
assert(list.length > 0);
list.forEach(item => assert.strictEqual(typeof item, 'string'));

assert.strictEqual(supports('fs'), true);
assert.strictEqual(supports('fs.mkdir'), true);
assert.strictEqual(supports('fs.mkdir.recursive', '11.0.0'), true);
assert.strictEqual(supports('fs.mkdir.recursive', '10.0.0'), false);
assert.strictEqual(supports('fs.mkdir.recursive', '10.8.0'), false);
assert.strictEqual(supports('fs.mkdir.recursive', '10.8.99'), false);
assert.strictEqual(supports('fs.mkdir.recursive', '10.9.0'), true);

assert.strictEqual(supports('fs.mkdir.foobar'), undefined);
assert.strictEqual(supports('fs.foobar'), undefined);
assert.strictEqual(supports('foobar'), undefined);

const [major, minor] =
  process.versions.node.split('.').map(x => Number(x));

if (major > 10) {
  assert.strictEqual(supports('fs.mkdir.recursive'), true);
} else if (major < 10) {
  assert.strictEqual(supports('fs.mkdir.recursive'), false);
} else {
  assert.strictEqual(supports('fs.mkdir.recursive'), minor >= 9);
}

console.log('Tests passed');
