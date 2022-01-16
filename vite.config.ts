import { defineConfig } from 'vite';
import { resolve as pathResolve } from 'path';

function resolve(path) {
    return pathResolve(__dirname, path)
}

export default defineConfig({
    resolve: {
        extensions: [ '.ts', '.js', '.es6' ],
        alias: [
            { find: '@', replacement: resolve('src') },

            // lib-proxy
            { find: 'less', replacement: resolve('src/lib-proxy/less') },
            { find: 'sass', replacement: resolve('src/lib-proxy/sass') },
            { find: 'stylus', replacement: resolve('src/lib-proxy/stylus') },
            { find: 'consolidate', replacement: resolve('src/lib-proxy/consolidate') },

            // browserify
            { find: 'process', replacement: resolve('node_modules/process/browser') },
            { find: 'buffer', replacement: resolve('node_modules/buffer/') },
            { find: 'url', replacement: resolve('node_modules/url/') },
            { find: 'util', replacement: resolve('node_modules/util/') },
            { find: 'assert', replacement: resolve('node_modules/assert/') },
            { find: 'path', replacement: resolve('node_modules/path-browserify') },
            { find: 'stream', replacement: resolve('node_modules/stream-browserify') },

            //
            { find: 'postcss', replacement: resolve('node_modules/postcss/lib/postcss') },
            { find: 'function-bind', replacement: resolve('src/modules-hack/function-bind') },
        ],
    },
    /*plugins: [
        legacy({
            externalSystemJS: true,
            targets: [ 'ie >= 11' ],
            additionalLegacyPolyfills: [ 'regenerator-runtime/runtime' ],
        }),
    ],*/
    build: {
        target: 'esnext',
        sourcemap: true,
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue'],
            output: [
                {
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        vue: 'Vue'
                    }
                },
                // ES module build
                {
                    dir: 'dist/esm',
                    format: 'esm'
                },
                // SystemJS build
                {
                    dir: 'dist/system',
                    format: 'system'
                }
            ]
        },
        lib: {
            entry: resolve('src/init.ts'),
            name: 'Vue2FrontSfc',
            formats: ['es', 'cjs', 'umd', 'iife'],
            fileName: (format) => `vue2-front-sfc.${format}.js`
        },
    }
});
