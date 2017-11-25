// import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

const globals = {
  '@angular/core': 'ng.core',
  '@capsule9/auth': 'c9.auth',
  'redux-observable': 'redux-observable',
  'rxjs/Observable': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/observable/of': 'Rx.Observable',
  'rxjs/observable/from': 'Rx.Observable',
  'rxjs/operator/map': 'Rx.Observable.prototype',
  'rxjs/operator/catch': 'Rx.Observable.prototype',
  'rxjs/operator/switchMap': 'Rx.Observable.prototype',
  'rxjs/operator/filter': 'Rx.Observable.prototype'
};

export default {
  input: '../../dist/packages-dist/ajax/esm5/ajax.js',
  output: {
    file: '../../dist/packages-dist/ajax/bundles/ajax.umd.js',
    format: 'umd'
  },
  exports: 'named',
  name: 'c9.ajax',
  amd: {id: '@capsule9/ajax'},
  plugins: [
    resolve({
      // pass custom options to the resolve plugin
      customResolveOptions: {
        moduleDirectory: '../../node_modules'
      }
    }),
    sourcemaps()
    // commonjs({
    //   include: '../../node_modules/**',
    // })
  ],
  external: Object.keys(globals),
  globals: globals
}
