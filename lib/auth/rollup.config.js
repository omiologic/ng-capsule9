import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

const globals = {
  '@capsule9/ajax': 'c9.ajax',
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/form': 'ng.form',
  '@angular/router': 'ng.router',
  '@angular/http': 'ng.http',
  '@angular-redux/store': 'ng-redux',
  'angular2-jwt': 'ng-jwt',
  'rxjs/Observable': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/Subscription': 'Rx',
  'rxjs/observable/of': 'Rx.Observable',
  'rxjs/observable/forkJoin': 'Rx.Observable',
  'rxjs/observable/fromPromise': 'Rx.Observable',
  'rxjs/operator/map': 'Rx.Observable.prototype',
  'rxjs/operator/last': 'Rx.Observable.prototype',
  'rxjs/operator/every': 'Rx.Observable.prototype',
  'rxjs/operator/mergeMap': 'Rx.Observable.prototype',
  'rxjs/operator/mergeAll': 'Rx.Observable.prototype',
  'rxjs/operator/concatAll': 'Rx.Observable.prototype',
};

export default {
  input: '../../dist/packages-dist/auth/esm5/auth.js',
  output: {
    file: '../../dist/packages-dist/auth/bundles/auth.umd.js',
    format: 'umd'
  },
  exports: 'named',
  name: 'c9.auth',
  amd: {id: '@capsule9/auth'},
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
