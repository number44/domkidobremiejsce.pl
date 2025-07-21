// webpack.config.mjs
// @ts-check

import defaultConfig from '@wordpress/scripts/config/webpack.config.js';
import { getAsBooleanFromENV } from '@wordpress/scripts/utils/index.js';
import WebSocket, { WebSocketServer } from 'ws';
import path from 'path'; // Import path for path.resolve

// Setup WebSocket for auto-refresh
const wss = new WebSocketServer({ port: 8080 });

class AutoRefresh {
  /**
   * @param {{ hooks: { done: { tap: (arg0: string, arg1: (stats: any) => void) => void; }; }; }} compiler
   */
  apply(compiler) {
    compiler.hooks.done.tap('AutoRefresh', (stats) => {
      if (!wss.clients) return;
      console.log('%c Connected websocket on port : 8080', 'color:green;');
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          console.log('%c WebSocket set.', 'color:green;');
          client.send('changed');
        }
      });
    });
  }
}

// Get the root directory of your project (where webpack.config.mjs is)
const projectRoot = process.cwd();

// Define your aliases for Webpack
const customAliases = {
  '@components': path.resolve(projectRoot, 'src/components/'),
  '@utils': path.resolve(projectRoot, 'src/utils/'),
  '@assets': path.resolve(projectRoot, 'assets/'),
  '@': path.resolve(projectRoot, 'src/'),
  '@scripts': path.resolve(projectRoot, 'resources/scripts/'),
  // Add more aliases here as defined in tsconfig.json
};

// Function to modify webpack config
const applyCustomConfig = (config) => {
  return {
    ...config,
    // Ensure resolve property exists and extend aliases
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias, // Keep existing aliases from defaultConfig
        ...customAliases, // Add your new custom aliases
      },
    },
    plugins: [...(config.plugins || []), new AutoRefresh()],
    watchOptions: {
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**', '**/.vscode/**', '**/build/**', '**/resources/**'],
    },
  };
};

// Check if the --experimental-modules flag is set.
const hasExperimentalModulesFlag = getAsBooleanFromENV('WP_EXPERIMENTAL_MODULES');

let webpackConfig;

if (hasExperimentalModulesFlag) {
  if (Array.isArray(defaultConfig)) {
    webpackConfig = defaultConfig.map(applyCustomConfig);
  } else {
    webpackConfig = applyCustomConfig(defaultConfig);
  }
} else {
  webpackConfig = applyCustomConfig(defaultConfig);
}

export default webpackConfig;
