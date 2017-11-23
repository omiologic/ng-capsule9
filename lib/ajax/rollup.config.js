import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

const globals = {
  '@angular/core': 'ng.core',
  // '@angular/common': 'ng.common',
  'rxjs/Observable': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/observable/of': 'Rx',
  'rxjs/observable/from': 'Rx',
  'rxjs/observable/merge': 'Rx',
  'rxjs/operator/map': 'Rx',
  'rxjs/operator/catch': 'Rx',
  'rxjs/operator/switchMap': 'Rx',
  'rxjs/operator/filter': 'Rx',
  'rxjs/Observer': 'Rx'
};

export default {
  input: '../../dist/packages/ajax/esm5/ajax.js',
  output: {
    file: '../../dist/packages/ajax/bundles/ajax.umd.js',
    format: 'umd'
  },
  exports: 'named',
  name: 'ng.capsule-ajax',
  amd: {id: '@capsule/ajax'},
  plugins: [
    resolve(),
    sourcemaps()
    // commonjs({
    //   include: '../node_modules/**',
    // })
  ],
  external: Object.keys(globals),
  globals: globals
}
