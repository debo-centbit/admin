import type { ConfigFunction } from '@babel/core';

const config: ConfigFunction = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ];

  const plugins = [
    // Your plugins here
  ];

  return {
    presets,
    plugins,
  };
};

export default config;
