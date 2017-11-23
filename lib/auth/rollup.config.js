import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

const globals = {
  '@angular/core': 'ng.core',
  // '@angular/common': 'ng.common',
  '@angular/form': 'ng.form',
  '@angular/router': 'ng.router',
  '@angular/http': 'ng.http',
  '@angular-redux/store': 'ng-redux',
  'angular2-jwt': 'ng-jwt',
  'rxjs/Observable': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/observable/of': 'Rx',
  'rxjs/observable/forkJoin': 'Rx',
  'rxjs/observable/fromPromise': 'Rx',
  'rxjs/operator/map': 'Rx',
  'rxjs/operator/last': 'Rx',
  'rxjs/operator/every': 'Rx',
  'rxjs/operator/mergeMap': 'Rx',
  'rxjs/operator/mergeAll': 'Rx',
  'rxjs/operator/concatAll': 'Rx',
};

export default {
  input: '../../dist/packages/ajax/esm5/auth.js',
  output: {
    file: '../../dist/packages/ajax/bundles/auth.umd.js',
    format: 'umd'
  },
  exports: 'named',
  name: 'ng.capsule-auth',
  amd: {id: '@capsule/auth'},
  plugins: [
    resolve(),
    sourcemaps()
  ],
  external: Object.keys(globals),
  globals: globals
}
