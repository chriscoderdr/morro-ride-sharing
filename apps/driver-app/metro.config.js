const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');

// Find the project and workspace directories
/* eslint-disable no-undef */
const projectRoot = __dirname; 
// This can be replaced with `find-yarn-workspace-root`
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];
// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

config.resolver.blacklistRE = exclusionList([
  /node_modules\/.*\/node_modules\/react-native\/.*/,                       // Exclude nested react-native instances
  /react-native-morro-taxi-rn-components\/node_modules\/.*/,                // Exclude all nested node_modules inside react-native-morro-taxi-rn-components
]);

module.exports = config;
