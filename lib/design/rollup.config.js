import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

const globals = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/router': 'ng.router',
  'rxjs/Observable': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/Subject': 'Rx'
  // 'rxjs/observable': 'Rx'
};

export default {
  input: '../../dist/packages/ajax/esm5/design.js',
  output: {
    file: '../../dist/packages/ajax/bundles/design.umd.js',
    format: 'umd'
  },
  exports: 'named',
  name: 'c9.design',
  amd: {id: '@capsule9/design'},
  plugins: [
    resolve(),
    sourcemaps()
  ],
  external: Object.keys(globals),
  globals: globals
}
