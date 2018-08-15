'use strict';

const { readFileSync } = require('fs');
const { join } = require('path');
const { satisfies } = require('semver');
const { safeLoad: yaml } = require('js-yaml');

const data = yaml(readFileSync(join(__dirname, 'data.yml'), 'utf8'));

const RANGE = '__range';

function getList(list = [], prefix, node = data) {
  Object.keys(node).forEach(key => {
    if (key === RANGE) {
      return;
    }
    const newPrefix = prefix ? prefix + '.' + key : key;
    list.push(newPrefix);
    getList(list, newPrefix, node[key]);
  });
  return list;
}

function get(feature, node = data, props) {
  if (!props) {
    props = feature.split('.');
  }
  const name = props.shift();
  const newNode = node[name];
  if (newNode) {
    if (name === RANGE) {
      throw new Error(`features cannot have '${RANGE}' in their name`);
    }
    if (props.length === 0) {
      return newNode[RANGE] ? newNode[RANGE] : '*';
    }
    return get(feature, newNode, props);
  }
  return undefined;
}

function supports(feature, version = process.versions.node) {
  const range = get(feature);
  return range ? satisfies(version, range) : undefined;
}

module.exports = {
  supports,
  get list() {
    return getList();
  }
};
