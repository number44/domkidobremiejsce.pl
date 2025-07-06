import defaultConfig from '@wordpress/scripts/config/webpack.config.js';
import path from 'path';
import { exec } from 'child_process';
import WebSocket, { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
class AutoRefresh {
  apply(compiler) {
    compiler.hooks.done.tap('AutoRefresh', (stats) => {
      console.log('AutoRefresh: Build finished!');
      // Here you can run your node script
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
export default {
  ...defaultConfig, // keep all defaults including entry
  resolve: {
    ...defaultConfig.resolve,
  },
  plugins: [...(defaultConfig.plugins || []), new AutoRefresh()],
};
