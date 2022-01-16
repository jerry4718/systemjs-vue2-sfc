import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupTypescript from '@rollup/plugin-typescript';
import rollupJson from '@rollup/plugin-json';
import rollupNodeResolve from '@rollup/plugin-node-resolve';
import { rollupSelfResolve } from './rollup-plugin-bundle-resolve';
import { resolve as pathResolve } from 'path';

const polyfillIncludes = [
  'process',
  'global',
  'util',
  'buffer',
  'stream',
  'events',
  'assert',
  'path',
  'url',
];

export function rollupPluginMergePlugin () {
  function resolve (path) {
    return pathResolve(process.cwd(), path);
  }

  const pluginCommonjs = rollupCommonjs();
  const pluginTypescript = rollupTypescript({
    tsconfig: resolve('tsconfig.json'),
  });
  const pluginJson = rollupJson();
  /*rollupPolyfillsNode({
    include: polyfillIncludes,
    exclude: ['process', 'global', 'buffer', 'util', 'sys', 'events', 'stream', 'path', 'querystring', 'punycode', 'url', 'string_decoder', 'http', 'https', 'os', 'assert', 'constants', '_stream_duplex', '_stream_passthrough', '_stream_readable', '_stream_writable', '_stream_transform', '_inherits', '_buffer_list', 'timers', 'console', 'vm', 'zlib', 'tty', 'domain', 'fs', 'crypto', 'http2', 'dns', 'dgram', 'child_process', 'cluster', 'module', 'net', 'readline', 'repl', 'tls', 'perf_hooks'].filter(n => !polyfillIncludes.includes(n)),
  }),*/
  const pluginNodeResolve = rollupNodeResolve({
    browser: true,
  });
  const pluginSelfResolve = rollupSelfResolve();



}
