import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';

const env = process.env.NODE_ENV;
const pkg = require('./package.json');

export default {
  input: 'src/index.js',
  output: {
    file: {
      es: pkg.module,
      cjs: pkg.main
    }[env],
    format: env
  },
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['@babel/external-helpers'],
      externalHelpers: true
    }),
    commonjs(),
    terser(),
    filesize()
  ],
  external: ['react', 'redux', 'react-redux']
};
