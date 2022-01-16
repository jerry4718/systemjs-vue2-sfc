import webpack from 'webpack';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: './src/init.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, './tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.((ts)|(js)|(mjs)|(es6))$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript'],
            plugins: [
              // '@babel/plugin-transform-typescript',
              [
                '@babel/plugin-transform-modules-systemjs',
                {
                  // outputs SystemJS.register(...)
                  'systemGlobal': 'System',
                },
              ],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    aliasFields: ['browser'],
    fallback: {
      path: 'path-browserify',
      url: 'url',
      buffer: 'buffer/',
      util: 'util/',
      stream: 'stream-browserify/',
      assert: 'assert/',
      fs: false,
    },
  },
  node: {
    // console: false,
    global: true,
    // process: true,
    __filename: 'mock',
    __dirname: 'mock',
    // Buffer: true,
    // setImmediate: true,
    // fs: 'empty'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_DEBUG': JSON.stringify(false),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
