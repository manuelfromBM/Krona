const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname; // apps/mobile

const workspaceRoot = path.resolve(projectRoot, "../.."); // my-turborepo

const config = getDefaultConfig(projectRoot);

config.watchFolders = [
  path.resolve(workspaceRoot, "packages"), // todos los packages locales
  path.resolve(workspaceRoot, "node_modules")
];

config.resolver.nodeModulesPath = [
  path.resolve(projectRoot, "node_modules"),       // node_modules de mobile
  path.resolve(workspaceRoot, "node_modules"),     // node_modules raíz del monorepo
];

config.resolver.sourceExts = [...config.resolver.sourceExts, "cjs"];

config.resolver.extraNodeModules = {
  react: path.resolve(workspaceRoot, "node_modules/react"),
  "react-native": path.resolve(workspaceRoot, "node_modules/react-native"),
};

module.exports = config;
