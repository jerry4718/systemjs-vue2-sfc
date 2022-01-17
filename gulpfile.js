import { resolve as pathResolve, dirname as pathDirname } from 'path';
import { fileURLToPath } from 'url';

import { rollup } from 'rollup';
import rollupTypescript from '@rollup/plugin-typescript';
import rollupNodeResolve from '@rollup/plugin-node-resolve';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupJson from '@rollup/plugin-json';
import rollupAlias from '@rollup/plugin-alias';
import rollupPolyfillsNode from 'rollup-plugin-polyfill-node';
import rollupReplace from '@rollup/plugin-replace';
import { rollupSelfResolve } from './rollup-scripts/plugin/self-resolve.js';

import gulp from 'gulp';

const { src, dest } = gulp;

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathDirname(__filename);

function resolve (path) {
  return pathResolve(__dirname, path);
}

// const pkg = JSON.parse(readFileSync(resolve('package.json')).toString());

export function copy () {
  return src('src/init.ts')
    .pipe(dest('output/'));
}

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

export async function bundle () {
  const bundle = await rollup({
    input: './src/init.ts',
    // external: [...Object.keys(pkg.dependencies || {})],
    treeshake: {
      preset: 'smallest',
      moduleSideEffects: 'no-external',
    },
    plugins: [
      rollupAlias({
        entries: [
          { find: '@', replacement: resolve('src') },

          // lib-proxy
          { find: 'less', replacement: resolve('src/lib-proxy/less') },
          { find: 'sass', replacement: resolve('src/lib-proxy/sass') },
          { find: 'stylus', replacement: resolve('src/lib-proxy/stylus') },
          { find: 'consolidate', replacement: resolve('src/lib-proxy/consolidate') },

          // browserify
          // { find: 'process', replacement: resolve('node_modules/process/browser') },
          // { find: 'events', replacement: resolve('node_modules/events') },
          // { find: 'buffer', replacement: resolve('node_modules/buffer/') },
          // { find: 'stream', replacement: resolve('node_modules/stream-browserify') },
          // { find: 'assert', replacement: resolve('node_modules/assert/') },
          // { find: 'path', replacement: resolve('node_modules/path-browserify') },
          // { find: 'url', replacement: resolve('node_modules/url/') },
          // { find: 'util', replacement: resolve('node_modules/util/') },

          //
          // { find: 'postcss', replacement: resolve('node_modules/postcss/lib/postcss') },
          // { find: 'function-bind', replacement: resolve('src/modules-hack/function-bind') },

          //
          // { find: '@vue/component-compiler-utils', replacement: resolve('node_modules/@vue/component-compiler-utils/lib') },

          //
          { find: 'async_hooks', replacement: resolve('src/lib-proxy/nop') },
          { find: 'hamljs', replacement: resolve('src/lib-proxy/nop') },
          { find: 'hamlet', replacement: resolve('src/lib-proxy/nop') },
          { find: 'haml-coffee', replacement: resolve('src/lib-proxy/nop') },
          { find: 'file', replacement: resolve('src/lib-proxy/nop') },
          { find: 'system', replacement: resolve('src/lib-proxy/nop') },
          { find: 'react-dom/server', replacement: resolve('src/lib-proxy/nop') },
          { find: 'react', replacement: resolve('src/lib-proxy/nop') },
          { find: 'marko', replacement: resolve('src/lib-proxy/nop') },
          { find: 'teacup/lib/express', replacement: resolve('src/lib-proxy/nop') },
        ],
      }),
      rollupCommonjs(),
      rollupTypescript({
        tsconfig: resolve('tsconfig.json'),
      }),
      rollupJson(),
      rollupPolyfillsNode({
        include: polyfillIncludes,
        // exclude: ['process', 'global', 'buffer', 'util', 'sys', 'events', 'stream', 'path', 'querystring', 'punycode', 'url', 'string_decoder', 'http', 'https', 'os', 'assert', 'constants', '_stream_duplex', '_stream_passthrough', '_stream_readable', '_stream_writable', '_stream_transform', '_inherits', '_buffer_list', 'timers', 'console', 'vm', 'zlib', 'tty', 'domain', 'fs', 'crypto', 'http2', 'dns', 'dgram', 'child_process', 'cluster', 'module', 'net', 'readline', 'repl', 'tls', 'perf_hooks'].filter(n => !polyfillIncludes.includes(n)),
      }),
      /*rollupPolyfillsNode({
        include: polyfillIncludes,
        exclude: ['process', 'global', 'buffer', 'util', 'sys', 'events', 'stream', 'path', 'querystring', 'punycode', 'url', 'string_decoder', 'http', 'https', 'os', 'assert', 'constants', '_stream_duplex', '_stream_passthrough', '_stream_readable', '_stream_writable', '_stream_transform', '_inherits', '_buffer_list', 'timers', 'console', 'vm', 'zlib', 'tty', 'domain', 'fs', 'crypto', 'http2', 'dns', 'dgram', 'child_process', 'cluster', 'module', 'net', 'readline', 'repl', 'tls', 'perf_hooks'].filter(n => !polyfillIncludes.includes(n)),
      }),*/
      rollupNodeResolve({
        browser: true,
      }),
      rollupSelfResolve(),
      rollupReplace({}),
    ],
  });

  await Promise.all(
    ['amd', 'cjs', 'es', 'iife', 'system', 'umd', 'commonjs', 'esm', 'module', 'systemjs']
      .map((format) => bundle.write({
        file: `./dist/vue2-front-sfc.${format}.js`,
        format: format,
        name: 'library',
        sourcemap: true,
      })),
  );
}
