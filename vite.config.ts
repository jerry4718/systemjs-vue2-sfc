import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    resolve: {
        extensions: ['ts', 'js'],
        alias: {
            '@/': path.resolve(__dirname, 'src/'),
            process: "process/browser",
            buffer: 'buffer/',
            url: 'url/',
            util: 'util/',
            assert: 'assert/',
            path: 'path-browserify',
            stream: 'stream-browserify',
            consolidate: path.resolve(__dirname, 'src/lib-proxy/consolidate'),
            less: path.resolve(__dirname, 'src/lib-proxy/less'),
            sass: path.resolve(__dirname, 'src/lib-proxy/sass'),
            stylus: path.resolve(__dirname, 'src/lib-proxy/stylus'),
            postcss: path.resolve(__dirname, 'node_modules/postcss'),
        },
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
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue'
                }
            }
        },
        lib: {
            entry: path.resolve(__dirname, 'src/init.ts'),
            name: 'Vue2FrontSfc',
            formats: ['es', 'cjs', 'umd', 'iife'],
            fileName: (format) => `vue2-front-sfc.${format}.js`
        },
    }
});
