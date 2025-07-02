import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import esbuild from 'rollup-plugin-esbuild';
import { dts } from 'rollup-plugin-dts';

import pkg from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
      esbuild({
        include: /\.[jt]sx?$/, // Compile .ts, .tsx, .js, .jsx
        exclude: /node_modules/,
        sourceMap: true,
        target: 'esnext',
        jsx: 'automatic',
        tsconfig: './tsconfig.build.json',
      }),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
    external: ['react', 'react-dom'],
  },
  {
input: 'src/index.ts',
  output: [{ file: 'dist/index.d.ts', format: 'esm' }],
  plugins: [dts()],
  external: [/\.css$/],
  },
];
