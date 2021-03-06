'use strict';
const plugins = require('./plugins');
const reactAppConfig = require('./base');

const rules = {};

const isPluginRule = ruleName => {
  for (const plugin of plugins) {
    if (ruleName.indexOf(`${plugin}/`) !== -1) {
      return true;
    }
  }
  return false;
};

Object.keys(reactAppConfig.rules).forEach(ruleName => {
  if (isPluginRule(ruleName)) {
    rules[`react-app/${ruleName}`] = reactAppConfig.rules[ruleName];
  } else {
    rules[ruleName] = reactAppConfig.rules[ruleName];
  }
});

module.exports = {
  parser: require.resolve('babel-eslint'),
  plugins: ['react-app'],
  rules,
  settings: reactAppConfig.settings,
  env: reactAppConfig.env,
  root: reactAppConfig.root,
  parserOptions: reactAppConfig.parserOptions
};
