import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import WebSocket, { WebSocketServer } from 'ws';
import { pluginSass } from '@rsbuild/plugin-sass';
const watch = process.argv.includes('--watch');
const wss = new WebSocketServer({ port: 8080 });
import { globby } from 'globby';
import path from 'path';
import fs from 'fs';
export default defineConfig(async () => {
  const entries = await buildEntries();
  console.log('entries', JSON.parse(JSON.stringify(entries)));
  return {
    plugins: [
      pluginReact(),
      pluginSass(),
      rsRefreshPlugin(),
      // copyWpBlockPlugin(),
    ],
    source: {
      entry: {
        'front/main': './resources/front/main.ts',
        'admin/main': './resources/admin/main.ts',
        // 'ds-app/view': './src/ds-app/view.ts',
        // 'ds-app/style': './src/ds-app/style-entry.ts',
        // 'ds-app/editor': './src/ds-app/editor-entry.ts',
      },
    },
    output: {
      filenameHash: false,
      cleanDistPath: true,
      sourceMap: true,
      inlineStyles: false,
      distPath: {
        root: 'dist',
        js: '',
        css: '',
        assets: '',
      },
      filename: {
        css: '[name].css',
      },
      emitCss: true,
    },
    dev: {
      writeToDisk: true,
    },
    tools: {
      htmlPlugin: false,
      cssExtract: {
        pluginOptions: {
          enforceRelative: false,
        },
      },
      rspack: {
        externals: {
          // React and ReactDOM are often externalized for WordPress
          react: 'React',
          'react-dom': 'ReactDOM',
          // Core WordPress dependencies
          '@wordpress/element': 'wp.element',
          '@wordpress/components': 'wp.components',
          '@wordpress/api-fetch': 'wp.api-fetch',
          '@wordpress/hooks': 'wp.hooks',
          '@wordpress/i18n': 'wp.i18n',
          '@wordpress/blocks': 'wp.blocks',
          '@wordpress/block-editor': 'wp.blockEditor',
          '@wordpress/data': 'wp.data',
          '@wordpress/editor': 'wp.editor', // Often used for classic editor integration
          '@wordpress/compose': 'wp.compose',
          '@wordpress/url': 'wp.url',
          '@wordpress/keycodes': 'wp.keycodes',
          '@wordpress/rich-text': 'wp.richText',
          '@wordpress/plugins': 'wp.plugins',
          '@wordpress/edit-post': 'wp.editPost',
          '@wordpress/dom-ready': 'wp.domReady',
          '@wordpress/date': 'wp.date',
          '@wordpress/primitives': 'wp.primitives',
          '@wordpress/html-entities': 'wp.htmlEntities',
          '@wordpress/notices': 'wp.notices',
          '@wordpress/token-list': 'wp.tokenList',
          '@wordpress/viewport': 'wp.viewport',
          '@wordpress/animations': 'wp.animations',
          '@wordpress/is-shallow-equal': 'wp.isShallowEqual',
          '@wordpress/interactivity': 'wp.interactivity', // Add this line
          '@wordpress/icons': 'wp.icons',

          // Potentially useful, depending on your project
          '@wordpress/core-data': 'wp.coreData', // For interacting with the REST API data store
          '@wordpress/preferences': 'wp.preferences', // For user preferences
          '@wordpress/reusable-blocks': 'wp.reusableBlocks', // If dealing with reusable blocks
          '@wordpress/format-library': 'wp.formatLibrary', // For rich text formats
          '@wordpress/dashboard': 'wp.dashboard', // If building dashboard widgets
          '@wordpress/media-utils': 'wp.mediaUtils', // For media library interactions
          '@wordpress/style-engine': 'wp.styleEngine', // For generating inline styles
          '@wordpress/preferences-persistence': 'wp.preferencesPersistence', // For persisting preferences
          '@wordpress/interface': 'wp.interface', // For UI patterns like sidebar, header, etc.
          '@wordpress/patterns': 'wp.patterns', // For block patterns

          // If you need jQuery for some reason (less common in modern blocks)
          jquery: 'jQuery',
        },
      },
    },
  };
});

interface ApiI {
  context: {
    watch: boolean;
  };
  onAfterBuild: (callback: () => void) => void;
  onExit: (callback: () => void) => void;
}

interface CopyApiI {
  context: {
    version: string;
    rootPath: string;
    distPath: string;
    cachePath: string;
    callerName: string;
    bundlerType: string;
    action: string;
  };
  logger: {};
  onAfterBuild: (callback: () => void) => void;
  onExit: (callback: () => void) => void;
  onBeforeBuild: (callback: () => void) => void;
}

const rsRefreshPlugin = () => ({
  name: 'refresh-plugin',
  setup(api: ApiI) {
    if (watch) {
      api.onAfterBuild(() => {
        console.log('after build');
        if (!wss.clients) return;
        console.log('%c Connected websocket on port : 8080', 'color:green;');
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            console.log('%c WebSocket set.', 'color:green;');
            client.send('changed');
          }
        });
      });
      // Clean up the WebSocket server when the build process ends
      api.onExit(() => {
        wss.close();
        console.log('%c WebSocket server closed.', 'color:green;');
      });
    }
  },
});
const copyWpBlockPlugin = () => ({
  name: 'copy-wp-block-plugin',
  async setup(api: CopyApiI) {
    const copyFiles = async () => {
      const files = await globby(['src/**/*.php', 'src/**/*.json']);

      for (const file of files) {
        const relativePath = file.replace(/^src[\\/]/, '');
        const destPath = path.join('build', relativePath);

        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.copyFileSync(file, destPath);

        console.log(`Copied ${file} -> ${destPath}`);
      }
    };
    api.onAfterBuild(copyFiles);
    api.onBeforeBuild(copyFiles); // Optional: copies files before build starts
  },
});

const buildEntries = async () => {
  const files = await globby(['src/**/index.ts', 'src/**/index.tsx']);
  const entries: Record<string, string> = {};

  for (const file of files) {
    const relativeDir = path.dirname(file).replace(/^src[\\/]/, '');
    const key = relativeDir.replace(/\\/g, '/');
    entries[key] = `./${file}`;
  }
  return entries;
};
