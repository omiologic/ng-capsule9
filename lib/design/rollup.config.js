import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

const globals = {
  '@angular/core': 'ng.core',
  '@angular/animations': 'ng.animations',
  '@angular/common': 'ng.common',
  '@angular/router': 'ng.router',
  'element-resize-detector': 'elem.resize',
  'rxjs/Observable': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/Subject': 'Rx'
  // 'rxjs/observable': 'Rx'
};

export default {
  input: '../../dist/packages-dist/design/esm5/design.js',
  output: {
    file: '../../dist/packages-dist/design/bundles/design.umd.js',
    format: 'umd'
  },
  exports: 'named',
  name: 'c9.design',
  amd: {id: '@capsule9/design'},
  plugins: [
    resolve(),
    sourcemaps(),
    commonjs({
      include: '../../node_modules/**',
    })
  ],
  external: Object.keys(globals),
  globals: globals
}
